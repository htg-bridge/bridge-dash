import React from "react";
import RefugeeMap from "./RefugeeMap";
import { config, camps, heatmap } from "../data/info";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campbox: [{ isOpen: false }, { isOpen: false }, { isOpen: false }]
    };
  }

  triggerPopup = campIndex => {
    console.log("HI", campIndex);
    const campbox = { ...this.state.campbox };
    const { isOpen } = campbox[campIndex];
    campbox[campIndex] = {
      isOpen: !isOpen
    };

    this.setState({ campbox }, () => {
      console.log(this.state.campbox);
      console.log("updated");
    });
  };

  render() {
    return (
      <div className="container">
        <RefugeeMap
          heatmap={heatmap}
          handleChange={this.handleChange}
          options={config}
          camps={camps}
          campbox={this.state.campbox}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API}&v=3.exp&libraries=geometry,drawing,places,visualization`}
          loadingElement={<div style={{ height: `100vh` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100vh` }} />}
          triggerPopup={this.triggerPopup}
        ></RefugeeMap>
      </div>
    );
  }
}

export default App;
