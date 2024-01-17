import React from "react"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Spinner } from "@chakra-ui/react";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface IOwnProps {
  currentOrigin: LatLngLiteral;
  destinations: LatLngLiteral[];
}


const center = {
  lat: 1.3013,
  lng: 103.9052
};


function CustomMap({ currentOrigin, destinations }: IOwnProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(currentOrigin);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return <Spinner />
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={currentOrigin} />
      { destinations.map((dest, i) => <Marker key={i} position={dest} /> )}
    </GoogleMap>
  )

}

export default React.memo(CustomMap)
