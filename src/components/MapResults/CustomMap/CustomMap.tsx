import { useState, useCallback, memo } from "react"
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { Flex, Spinner } from "@chakra-ui/react";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface IOwnProps {
  currentOrigin: LatLngLiteral;
  destinations: LatLngLiteral[];
}

function CustomMap({ currentOrigin, destinations }: IOwnProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState([])

  const onLoad = useCallback(async function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds();
    const markers = [currentOrigin, ...destinations]
    for (const marker of markers) {
      bounds.extend(marker);
    }
    map.fitBounds(bounds);
    setMap(map)
    // await calculateRoute()
  }, [])

  // async function calculateRoute() {
  //   const directionsService = new google.maps.DirectionsService()
  //   const res = []
  //   for (const dest of destinations) {
  //     const results = await directionsService.route({
  //       origin: currentOrigin,
  //       destination: dest,
  //       travelMode: google.maps.TravelMode.DRIVING
  //     })
  //     res.push(results)
  //   }
  //   setDirectionsResponse(res)
  // }

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  if (!isLoaded) {
    return (
      <Flex height={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Spinner color="#00BFA6" size={'xl'} emptyColor='gray.200' thickness='3px' speed='0.7s' />
      </Flex>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentOrigin}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      // onCenterChanged={calculateRoute} causes infinite re-renders
    >
      {<Marker
        position={currentOrigin}
        icon={"/home.png"}
      /> }
      {destinations.map((dest, i) => <Marker key={i} position={dest} icon={"landscape.png"} />)}
      {/* {
        directionsResponse &&
          directionsResponse.map(resp => 
          <DirectionsRenderer 
            directions={resp} 
            options={{
            polylineOptions: {
              strokeColor: "#000000",
              strokeOpacity: 0.5,
              strokeWeight: 7
            },
            markerOptions: { icon: "/landscape.png", zIndex: -100 },
            }} 
          />)
      } */}
    </GoogleMap>
  )

}

export default memo(CustomMap)
