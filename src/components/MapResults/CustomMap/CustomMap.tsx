import { useState, useCallback, memo } from "react"
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { Flex, Spinner } from "@chakra-ui/react";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import Link from "next/link";

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
  const [selectedMarker, setSelectedMarker] = useState<LatLngLiteral>()

  const onLoad = useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    const markers = [currentOrigin, ...destinations]
    for (const marker of markers) {
      bounds.extend(marker);
    }
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  function generateGoogleMapsDirectionUrl(dest: LatLngLiteral) {
    return `https://www.google.com/maps/dir/?api=1&origin=${currentOrigin.lat},${currentOrigin.lng}&destination=${dest.lat},${dest.lng}&travelmode=transit`
  }

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
    >
      <Marker position={currentOrigin} icon={"/location.png"} />

      {
        destinations.map((dest, index) =>
          <Marker
            key={index}
            position={dest}
            icon={"/pin.png"}
            onClick={() => setSelectedMarker(dest)}
          />)
      }

      {
        selectedMarker &&
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker(undefined)}
          onUnmount={() => setSelectedMarker(undefined)}
        >
          <Link
            href={generateGoogleMapsDirectionUrl(selectedMarker)}
            target="_blank"
            style={{ textDecoration: "underline" }}
          >
            View directions
          </Link>
        </InfoWindow>
      }

    </GoogleMap>
  )

}

export default memo(CustomMap)
