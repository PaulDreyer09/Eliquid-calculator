import React, { Component } from "react";
import FlavorTable from "./flavorTable";


class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bottleSize: 100,
      pg: 70,
      vg: 30,
      nicBase: 0,
      nicTarget: 0,
      nicType: "vg",
      flavoring: 0,
      submitted: false,
      submitData: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    //Base ml to calculate with
    const bottleSize = this.state.bottleSize;
    
    //Nicotine percentage calculations
    const nicPercent = this.state.nicTarget > 0 ? (this.state.nicTarget / this.state.nicBase) * 100 : 0;
    const nic = bottleSize * nicPercent / 100;

    //Flavoring percentage calculations
    const flavoringPercent = this.state.flavoring;
    const flavoring = (bottleSize * flavoringPercent) / 100;

    //Value for base ingredients total after flavoring is removed from the total liquid
    const basePercent = bottleSize * (100 - flavoringPercent) / 100;

    //PG and VG calculations which are dependant on nicotine base type
    let pg = (bottleSize  * (basePercent * this.state.pg /100)) / 100;
    let vg = (bottleSize  * (basePercent * this.state.vg /100)) / 100;

    //If nic base is pg, you need that amount of less pg and same with vg
    if(this.state.nicType === "vg"){
      vg -= nic;
    }else{
      pg -= nic;
    }    

    this.setState({
      submitted: true,
      submitData: {
        bottleSize: bottleSize,
        pg: pg,
        vg: vg,
        nic: nic,
        flavoring: flavoring
      }
    });
    e.preventDefault();
  }

  handleChange(e) {
    switch (e.target.name) {
      case "pg":
        this.setState({
          pg: e.target.value,
          vg: 100 - e.target.value
        });
        break;

      case "vg":
        this.setState({
          vg: e.target.value,
          pg: 100 - e.target.value
        });
        break;

      case "bottleSize":
        this.setState({
          bottleSize: e.target.value
        });
        break;

      case "nicBase":
        this.setState({
          nicBase: e.target.value
        });
        break;

      case "nicTarget":
        this.setState({
          nicTarget: e.target.value
        });
        break;

      case "nicType":
        this.setState({
          nicType: e.target.value
        });
        break;

      case "flavoring":
        this.setState({
          flavoring: e.target.value
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="Calculator">      
        <h3>Calculate your eliquid measurements</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div id='bottle-size' className="form-control">
            <label>Bottle Size (ml)</label>
            <input
            type="number"
            name="bottleSize"
            value={this.state.bottleSize}
            onChange={this.handleChange}
          />
          </div>

          <div className="form-control">
            <label>PG</label>
            <span>
              <input
                type="range"
                onChange={this.handleChange}
                name="pg"
                min="0"
                max="100"
                value={this.state.pg}
              />
              {this.state.pg}%
            </span>
          </div>
          
          <div className="form-control">
            <label>VG</label>
            <span>
              <input
                type="range"
                onChange={this.handleChange}
                name="vg"
                min="0"
                max="100"
                value={this.state.vg}
              />
              {this.state.vg}%
            </span>

          </div>

          <div className="form-control">
            <label>Nicotine Base mg</label>
            <input
            type="number"
            name="nicBase"
            onChange={this.handleChange}
            value={this.state.nicBase}
          />
          </div>

          <div className="form-control">
            <label>Nicotine Target mg</label>
            <input
              type="number"
              name="nicTarget"
              onChange={this.handleChange}
              value={this.state.nicTarget}
            />
          </div>

          <div className="form-control">
            <label>Nicotine Type: </label>
            <select className="" value={this.state.nicType} name='nicType' onChange={this.handleChange}>
              <option value="vg">VG</option>
              <option value="pg">PG</option>
            </select>
          </div>

          <div>            
            <FlavorTable />
          </div>         

          <input className="submit-btn" type="submit" />
        </form>       
        
        {
          this.state.submitted? 
          <div>
            <h2>Results</h2>
            <p>Bottle Size: {this.state.submitData.bottleSize}</p>
            <p>PG: {this.state.submitData.pg} ml</p>
            <p>VG: {this.state.submitData.vg} ml</p>
            <p>Nicotine: {this.state.submitData.nic} ml</p>
            <p>Flavoring: {this.state.submitData.flavoring} ml</p>
          </div> : ''
        }
      </div>
    );
  }
}

export default Calculator;