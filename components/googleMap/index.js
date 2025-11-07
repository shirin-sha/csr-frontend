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

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!googleMapsApiKey) {
    // eslint-disable-next-line no-console
    console.warn('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable. Google Map will not load.');
}

export default GoogleApiWrapper({
    apiKey: googleMapsApiKey
})(MapContainer);