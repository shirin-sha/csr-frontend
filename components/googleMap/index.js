import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, { Component } from 'react';
const containerStyle = {
    position: 'relative',
    height: '480px',
    width:'100%'

}
export class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={14} containerStyle={containerStyle} style={{borderRadius:"5px 0px 0px 5px"}} disableDefaultUI={true}
            initialCenter={{
                lat: 11.2540905,
                lng: 75.831095
              }}  >
            </Map>
        );
    }
}

//development purpose api - this must be replaced
export default GoogleApiWrapper({
    apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
})(MapContainer)