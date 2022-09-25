import React, { useState } from 'react';
import FlavorTable from './flavorTable';

const Calculator = () => {

  const [bottleSize, setBottleSize] = useState(100);
  const [vg, setVg] = useState(70);
  const [pg, setPg] = useState(30);
  const [nicBase, setNicBase] = useState(0);
  const [nicType, setNicType] = useState("vg");
  const [nicTarget, setNicTarget] = useState(0);
  const [flavorList, setFlavorList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitData, setSubmitData] = useState({});

  /**
   * Handles form submit button
   * @param {event} e 
   */
  const handleSubmit = (e) => {
    //Nicotine percentage calculations
    const nicPercent = nicTarget > 0 ? (nicTarget / nicBase) * 100 : 0;
    const nic = bottleSize * nicPercent / 100;

    //Checking for invalid form values
    if(nicTarget > 0 && nicBase == 0) {
      alert("Nicotine Target can not be higher than 0 if Nicotine base is set to 0\n Calcultion results will be unreliable.");
    }
    else if(Math.floor(nicBase) < Math.floor(nicTarget)) {
      alert('Nicotine base is less than Nicotine Target.\n Calculation results will be unreliable.'); 
    }
    else if(nicPercent > vg && nicType === "vg") {
      alert("VG set too low for the amount of nicotine.\n Calculation results will be unreliable."); 
    }
    else if(nicPercent > pg && nicType === "pg") {
      alert("PG set too low for the amount of nicotine.\n Calculation results will be unreliable."); 
    }   
    else{
    //Flavoring percentage calculations
    const flavoringPercent = flavorList.reduce((total, flavorItem) => total + flavorItem.percentage, 0);

    const flavoringAmount = (bottleSize * flavoringPercent) / 100;

    //PG and VG calculations which are dependant on nicotine base type
    let pgAmount = (bottleSize * pg / 100) - flavoringAmount;

    let vgAmount = (bottleSize * vg / 100) ;

    //If nic base is pg, you need that amount of less pg and same with vg
    if (nicType === "vg") {
      vgAmount -= nic;
    } else {
      pgAmount -= nic;
    }

    //Submit Data stored
    setIsSubmitted(true);
    setSubmitData({
      bottleSize: bottleSize,
      pg: Math.round((pgAmount + Number.EPSILON) * 100) / 100,
      vg: Math.round((vgAmount + Number.EPSILON) * 100) / 100,
      nic: Math.round((nic + Number.EPSILON) * 100) / 100,
      flavoring: Math.round((flavoringAmount + Number.EPSILON) * 100) / 100
      // Change to list of flavors 
    });}
    e.preventDefault();
  }

  /**
   * Handles form changes
   * @param {event} e 
   */
  const handleChange = (e) => {
    switch (e.target.name) {
      case "pg":
        setPg(e.target.value);
        setVg(100 - e.target.value)
        break;

      case "vg":
        setVg(e.target.value)
        setPg(100 - e.target.value)
        break;

      case "bottleSize":
        setBottleSize(e.target.value);
        break;

      case "nicBase":
        setNicBase(e.target.value)
        break;

      case "nicTarget":
        setNicTarget(e.target.value);
        break;

      case "nicType":
        setNicType(e.target.value);
        break;

      default:
        break;
    }
  }

  /**
   * Display the JSX object that shows the calculation results
   * @returns {JSX}
   */
  const showResultsDisplay = () => {
    return (
      <div>
        <h2>Results</h2>
        <p>Bottle Size:   {submitData.bottleSize}</p>
        <p>PG:   {submitData.pg} ml</p>
        <p>VG:   {submitData.vg} ml</p>
        <p>Nicotine({nicType.toUpperCase()}):   {submitData.nic} ml</p>
        <p>Flavoring:   {submitData.flavoring} ml</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Flavor Name</th>
                <th>Vendor</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {flavorList.map((flavorItem,index) =>
                <tr key={index}>
                  <td>{flavorItem.name}</td>
                  <td>{flavorItem.vendorName}</td>
                  <td>{flavorItem.percentage * submitData.bottleSize / 100} ml</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>
      </div>
    )
  }

  return (
    <div className="Calculator2">
      <h3>Calculate your eliquid measurements</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div id='bottle-size' className="form-control">
          <label>Bottle Size (ml)</label>
          <input
            type="number"
            name="bottleSize"
            value={bottleSize}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label>PG</label>
          <span>
            <input
              type="range"
              onChange={handleChange}
              name="pg"
              min="0"
              max="100"
              value={pg}
            />
            {pg}%
          </span>
        </div>

        <div className="form-control">
          <label>VG</label>
          <span>
            <input
              type="range"
              onChange={handleChange}
              name="vg"
              min="0"
              max="100"
              value={vg}
            />
            {vg}%
          </span>

        </div>

        <div className="form-control">
          <label>Nicotine Base mg</label>
          <input
            type="number"
            name="nicBase"
            onChange={handleChange}
            value={nicBase}
          />
        </div>

        <div className="form-control">
          <label>Nicotine Target mg</label>
          <input
            type="number"
            name="nicTarget"
            onChange={handleChange}
            value={nicTarget}
          />
        </div>

        <div className="form-control">
          <label>Nicotine Type: </label>
          <select className="" value={nicType} name='nicType' onChange={handleChange}>
            <option value="vg">VG</option>
            <option value="pg">PG</option>
          </select>
        </div>

        <div>
          <FlavorTable
            flavorList={flavorList}
            setFlavorList={setFlavorList}
            PG={pg}
          />
        </div>

        <input className="submit-btn" type="submit" />
      </form>

      {
        isSubmitted ? showResultsDisplay() : ''
      }
    </div>
  );
}

export default Calculator;