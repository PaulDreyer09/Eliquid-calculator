import React, { useState } from 'react'

/**
 * 
 * @param {Array, Function, number} Props containing Array list of flavorItem objects, the state management method for the array and the total PG for the mixture
 * @returns 
 */
export default function FlavorTable({ flavorList, setFlavorList, PG}) {
    const [displayAddFlavorItemForm, setDisplayAddFlavorItemForm] = useState(false);
    //Form Data for adding a new flavor to the flavor list
    const [addFlavorItemFormData, setAddFlavorItemFormData] = useState({
        name: '',
        vendorName: '',
        percentage: 0,
    })
    const [flavorTotal, setFlavorTotal] = useState(0)

    /**
     * Reset addFlavorItemFormData to default
     */
    const resetAddFlavorItemFormData = () => {
        setAddFlavorItemFormData({
            name: '',
            vendorName: '',
            percentage: 5,
        });
    }

    /**
     * Toggles displaying the Form to add a Flavor Item to the flavor list
     */
    const toggleDisplayAddFlavorItemForm = () => {
        setDisplayAddFlavorItemForm(!displayAddFlavorItemForm);
        resetAddFlavorItemFormData();
    }

    /**
     * Add flavor object to flavorList from addFlavorItemForm
     */
    const handleAddFlavor = () => {
        let tempList = [...flavorList];
        let newFlavorData = { ...addFlavorItemFormData }

        tempList.push(newFlavorData);

        setFlavorList(tempList);

        const totalFlavorPercerntage = tempList.reduce((total, flavor) => total + flavor.percentage, 0);
        setFlavorTotal(totalFlavorPercerntage);
        if (totalFlavorPercerntage > PG) { 
            let message = `Total flavor percentage is more than selected PG percentage\nCalculations are not going to be reliable.\nAdjust PG/VG ratio or flavor item values for more reliable results`
            alert(message) 
        }

        toggleDisplayAddFlavorItemForm();
    }

    /**
     * Handle state changes from form input
     * @param {event} e 
     */
    const handleChange = (e) => {
        const input = e.target;
        let temp = { ...addFlavorItemFormData };

        switch (input.name) {
            case ('name'):
                temp.name = input.value;
                setAddFlavorItemFormData(temp);
                break;

            case ('vendorName'):
                temp.vendorName = input.value;
                setAddFlavorItemFormData(temp);
                break;

            case ('flavorPercentage'):
                if (input.value <= 100) {
                    temp.percentage = Number.parseFloat(input.value);
                    setAddFlavorItemFormData(temp);
                }
                break;

            default:
                break;
        };
    }

    /**
     * Display a form for adding a new flavor to the list
     * @returns {JSX}
     */
    const showAddFlavorItemForm = () => {
        return (
            <tr className='addFlavorItemForm'>
                <td>
                    <input
                        type="text"
                        name='name'
                        placeholder='Enter Name'
                        onChange={handleChange}
                        value={addFlavorItemFormData.flavorName}>
                    </input>
                </td>
                <td>
                    <input
                        type="text"
                        name='vendorName'
                        placeholder='Enter Name'
                        onChange={handleChange}
                        value={addFlavorItemFormData.vendorName}>
                    </input>
                </td>
                <td>
                    <input
                        type="number"
                        name="flavorPercentage"
                        onChange={(e) => { if (e.value != NaN) handleChange(e) }}
                        value={addFlavorItemFormData.percentage}>
                    </input>
                </td>
            </tr>
        );
    }

    /**
     * Dispay the flavor item list as table rows
     * @returns {JSX}
     */
    const showFlavorList = () => {
        return (flavorList.map((flavor, index) => (
            <tr key={index}>
                <td>{flavor.name}</td>
                <td>{flavor.vendorName}</td>
                <td>{flavor.percentage}</td>
            </tr>)

        ));
    }
    /**
     * Displays a table row showing the flavor list total percentage
     * @returns {JSX}
     */
    const showFlavorTotals = () => {
        return <tr>
            <td></td>
            <td>Total %</td>
            <td>{flavorTotal}</td>
        </tr>
    }

    //Render component jsx data
    return (
        <div>
            <div className='flavorTable'>
                <h3><b>Flavorings</b></h3><hr></hr>
                { }
                {!displayAddFlavorItemForm ?
                    <button className='btn btn-primary' type='button' onClick={toggleDisplayAddFlavorItemForm}>
                        Add Flavor Item
                    </button> : <div>
                        <button type='button' onClick={handleAddFlavor}>Confirm</button>
                        <button type='button' onClick={toggleDisplayAddFlavorItemForm}>Cancel</button>
                    </div>
                }
                <table>
                    <thead>
                        <tr>
                            <th>Flavor Name</th>
                            <th>Vendor</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Input form for adding new flavors to the list */
                        displayAddFlavorItemForm && showAddFlavorItemForm()}
                        {showFlavorList()}
                        {showFlavorTotals()}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
