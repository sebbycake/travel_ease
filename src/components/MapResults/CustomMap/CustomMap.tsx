import { useState, useCallback, memo } from "react"
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { LatLngLiteral } from "@googlemaps/google-maps-services-js";
import Link from "next/link";
import { DestinationResult } from "@/pages/api/distance";

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface IOwnProps {
  currentOrigin: LatLngLiteral;
  destinations: DestinationResult[];
}

function CustomMap({ currentOrigin, destinations }: IOwnProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const [map, setMap] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState<DestinationResult>()

  const onLoad = useCallback(async function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(currentOrigin)
    for (const dest of destinations) {
      bounds.extend(dest.position);
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
            position={dest.position}
            icon={"/pin.png"}
            onClick={() => setSelectedMarker(dest)}
          />)
      }

      {
        selectedMarker &&
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(undefined)}
          onUnmount={() => setSelectedMarker(undefined)}
        >
          <Stack>
            <Heading size='xs'>{selectedMarker.name}</Heading>
            <Text fontSize='sm'>{selectedMarker.address}</Text>
            <Link
              href={generateGoogleMapsDirectionUrl(selectedMarker.position)}
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              View directions
            </Link>
          </Stack>
        </InfoWindow>
      }

    </GoogleMap>
  )

}

export default memo(CustomMap)
