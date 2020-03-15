/* global google */
import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import HeatmapLayer from "react-google-maps/lib/components/visualization/HeatmapLayer";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasElapsed: false
    };
  }

  componentDidUpdate(prevProps) {
    const { hasElapsed } = this.state;
    const { campbox } = this.props;
    if (!hasElapsed && JSON.stringify(campbox) !== JSON.stringify(prevProps.campbox)) {
      setTimeout(
        () =>
          this.setState({ hasElapsed: true }, () => {
            console.log("component updated", this.state.hasElapsed);
          }),
        3000
      );
    }
  }

  handleMarkersClicked = index => {
    this.props.triggerPopup(index);
  };

  convertCoordinatesText = obj => {
    return new google.maps.LatLng(obj.lat, obj.lng);
  };
  render() {
    const { camps, options, heatmap } = this.props;
    const { incidences, zoom, center } = options;

    const campsFindingDivs = index => camps[index].findings.map(item => <li>{item}</li>);

    const campsDivs = incidences.map((item, index) => (
      <>
        <Marker position={item} onClick={() => this.handleMarkersClicked(index)}>
          <InfoWindow>
            <div className="window window-container">
              <strong>{camps[index].name}</strong>
              <div className="window-health">
                <div>Health status:</div>
                <div
                  style={{ backgroundColor: camps[index].priority, minHeight: `1vh`, minWidth: `1vw` }}
                ></div>
              </div>
              <div>
                {this.props.campbox[index].isOpen ? campsFindingDivs(index) : null}
                {this.props.campbox[index].isOpen && this.state.hasElapsed ? (
                  <li>
                    <strong className="window-warning">
                      <span>[WARNING]</span> Medical supplies projected to finish in 10 days!
                    </strong>
                  </li>
                ) : null}
              </div>
            </div>
          </InfoWindow>
        </Marker>
      </>
    ));

    const gradient = [
      "rgba(0, 255, 255, 0)",
      "rgba(0, 255, 255, 1)",
      "rgba(0, 191, 255, 1)",
      "rgba(0, 127, 255, 1)",
      "rgba(0, 63, 255, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(0, 0, 223, 1)",
      "rgba(0, 0, 191, 1)",
      "rgba(0, 0, 159, 1)",
      "rgba(0, 0, 127, 1)",
      "rgba(63, 0, 91, 1)",
      "rgba(127, 0, 63, 1)",
      "rgba(191, 0, 31, 1)",
      "rgba(255, 0, 0, 1)"
    ];

    return (
      <GoogleMap defaultZoom={zoom} defaultCenter={center}>
        {campsDivs}
        <HeatmapLayer
          data={heatmap.map(location => this.convertCoordinatesText(location))}
          maxIntensity={1}
          gradient={gradient}
          opacity={0.6}
          radius={20}
        />
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
