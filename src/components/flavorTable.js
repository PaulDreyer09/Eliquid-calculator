import React, {useState} from 'react'


export default function FlavorTable() {
    //Return object containing flavor name, vendor name and flavor concentrate percentage

    //Return object containing data for a flavor item
    const flavorItem = (name, vendorName, percentage) => {
        const flavorObj = {
            flavorName: name,
            vendorName: vendorName,
            percentage: percentage
        };
        return flavorObj;
    }

    //Create List of flavor items to display on the flavor table
    const [flavorList, setFlavorList] = useState([  
        flavorItem("Mango", "TPA", 5),
        flavorItem("Mango", "TPA", 5),
    ]);

    //Form Data for adding a new flavor to the flavor list
    const [addFlavorItemFormData, setAddFlavorItemFormData] = useState({
        flavorName: '', 
        vendorName: '', 
        percentage: 0,
    })

    const [addFlavorItemFormName, setAddFlavorItemFormNane] = useState("test")

    const [displayAddFlavorItemForm, setDisplayAddFlavorItemForm] = useState(false);

    //Reset addFlavorItemFormData to default
    const resetAddFlavorItemFormData = () => {
        setAddFlavorItemFormData({
            flavorName: 'test', 
            vendorName: 'test', 
            percentage: 40,
        });
    }

    //Toggle display for addFlavorItemForm
    const toggleDisplayAddFlavorItemForm = () => {
        setDisplayAddFlavorItemForm(!displayAddFlavorItemForm);
        resetAddFlavorItemFormData();
    }

    //Add flavor object to flavorList from addFlavorItemForm
    const handleAddFlavor = () => {
        let tempList = [...flavorList];
        let newFlavorData = {...addFlavorItemFormData}

        tempList.push(newFlavorData);

        setFlavorList(tempList);
    }

    //Handle state changes from form input
    const handleChange = (e) => {
        const input = e.target;
        let temp = {...addFlavorItemFormData};

        switch(e.target.name){
            case('flavorName'):
            //console.log("name changed to " + e.target.value)
            temp.name = e.target.value;
            console.log("name changed to " + JSON.stringify({...temp}))            
            setAddFlavorItemFormData(temp);
            break;

            case('vendorName'):
            temp.vendorName = e.target.value;
            setAddFlavorItemFormData(temp);
            break;

            case('flavorFercentage'):
            temp.percentage = e.target.value;
            setAddFlavorItemFormData(temp);
            break;
        };
    }

    //Return a form for adding a new flavor to the list
    const addFlavorItemForm = () => {
        return (
        <tr className='addFlavorItemForm'>
            <td><input type="text" name='flavorName' placeholder='Enter Name' onChange={handleChange} value={addFlavorItemFormData.flavorName}></input></td>
            <td><input type="text" name='vendorName' placeholder='Enter Name' onChange={handleChange} value={addFlavorItemFormData.vendorName}></input></td>
            <td><input type="number" name="flavorPercentage" onChange={handleChange} value={addFlavorItemFormData.percentage}></input></td>
        </tr>
        );
    }

    //Render component jsx data
    return (
        <div>
            <div className='flavorTable'>
                <h3><b>Flavorings</b></h3><hr></hr>
                {!displayAddFlavorItemForm? 
                    <button className='btn btn-primary' type='button' onClick={toggleDisplayAddFlavorItemForm}>
                        Add Flavor Item
                    </button> : <div>
                        <button type='button' onClick={handleAddFlavor}>Confirm</button>
                        <button type='button' onClick={toggleDisplayAddFlavorItemForm}>Cancel</button>
                    </div>
                    
                    }
                <table>
                    <tr>
                        <th>Flavor Name</th>
                        <th>Vendor</th>
                        <th>Percentage</th>
                    </tr>

                    {/* Input form for adding new flavors to the list */
                        displayAddFlavorItemForm && addFlavorItemForm()
                    }
                    
                    {   /* Display List of added flavors */
                        flavorList.map((flavor, index) => ( 
                        <tr key={index}>
                            <td>{flavor.flavorName}</td>
                            <td>{flavor.vendorName}</td>
                            <td>{flavor.percentage}</td>
                        </tr> 
                    ))}

                    {/* Total percentage used for flavorings */}
                    <tr>
                        <td></td>
                        <td>Total %</td>
                        <td>{flavorList.reduce((total, flavor) => total + flavor.percentage, 0)}</td>
                    </tr>
                </table>
                
            </div>
        </div>    
  )
}
