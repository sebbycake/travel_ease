import { useState, useEffect, useRef } from 'react'
import {
  Input,
  SimpleGrid,
  Stack,
  Radio,
  RadioGroup,
  Tooltip,
  FormLabel,
  Button,
}
  from '@chakra-ui/react'
import { PATHS } from '@/constants';
import { getUrlSearchParams } from '@/utils/utils';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

type SearchParamsType = {
  s1: string; s2: string; s3: string; s4: string; s5: string;
  s6: string; s7: string; s8: string; s9: string; s10: string;
  d1: string; d2: string; d3: string; d4: string; d5: string;
  d6: string; d7: string; d8: string; d9: string; d10: string;
};

export default function Form(): JSX.Element {

  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    s1: "", s2: "", s3: "", s4: "", s5: "",
    s6: "", s7: "", s8: "", s9: "", s10: "",
    d1: "", d2: "", d3: "", d4: "", d5: "",
    d6: "", d7: "", d8: "", d9: "", d10: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const inputRefMap = {
    s1: useRef(), s2: useRef(), s3: useRef(),
    s4: useRef(), s5: useRef(), s6: useRef(),
    s7: useRef(), s8: useRef(), s9: useRef(),
    s10: useRef(), d1: useRef(), d2: useRef(),
    d3: useRef(), d4: useRef(), d5: useRef(), 
    d6: useRef(), d7: useRef(), d8: useRef(),
    d9: useRef(), d10: useRef(),
  }
  const SRC_KEYS: Array<keyof typeof searchParams> = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"]
  const DEST_KEYS: Array<keyof typeof searchParams> = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"]

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ['places']
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const initialParams: Partial<SearchParamsType> = {}
    SRC_KEYS.concat(DEST_KEYS).forEach((val) => {
      initialParams[val as keyof SearchParamsType] = queryParams.get(val) || ''
    })
    setSearchParams(initialParams as SearchParamsType);
  }, [])

  function redirect() {
    setIsLoading(true)
    window.location.href = `${PATHS.results}?${getUrlSearchParams()}`
  }

  const handleChange = (key: string, event?: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      const updatedParams = { ...prev, [key]: event ? event.target.value : inputRefMap[key].current.value }
      const queryParams = new URLSearchParams(updatedParams).toString()
      const currentPath = window.location.pathname
      history.replaceState(null, "", `${currentPath}?${queryParams}`)
      return updatedParams
    })
  };

  function isDisabled() {
    return searchParams.s1 === "" || searchParams.d1 === ""
  }

  if (!isLoaded) {
    return <></>
  }

  return <>
    <SimpleGrid columns={2} spacing={4}>
      <Stack spacing={2}>
        <Tooltip
          label="After researching the various hotels and Airbnbs, copy their names
                  or addresss below."
          placement='top-start'
        >
          <FormLabel as='legend'>
            Accommodation Options (source)
          </FormLabel>
        </Tooltip>
        {
          SRC_KEYS.map((key, index) =>
            <Autocomplete onPlaceChanged={() => handleChange(key)}>
              <Input
                key={key}
                placeholder={`Enter location of source ${index + 1} ${index > 0 ? '(Optional)' : ''}`}
                value={searchParams[key]}
                focusBorderColor='#CBD5E0'
                onChange={(event) => handleChange(key, event)}
                ref={inputRefMap[key]}
              />
            </Autocomplete>
          )
        }
      </Stack>

      <Stack spacing={2}>
        <Tooltip
          label="Copy the names or addresses of the places in your itinerary below."
          placement='top-start'
        >
          <FormLabel as='legend'>
            Places of Attractions (destination)
          </FormLabel>
        </Tooltip>
        {
          DEST_KEYS.map((key, index) =>
            <Autocomplete onPlaceChanged={() => handleChange(key)}>
              <Input
                key={key}
                placeholder={`Enter destination of destination ${index + 1} ${index > 0 ? '(Optional)' : ''}`}
                value={searchParams[key]}
                focusBorderColor='#CBD5E0'
                onChange={(event) => handleChange(key, event)}
                ref={inputRefMap[key]}
              />
            </Autocomplete>
          )
        }
      </Stack>
    </SimpleGrid>

    <Button
      colorScheme='teal'
      isLoading={isLoading}
      isDisabled={isDisabled()}
      onClick={redirect}
    >
      Find
    </Button>

    {/* <RadioGroup colorScheme='green'>
      <FormLabel as='legend'>
        Mode of Transport
      </FormLabel>
      <Stack direction='row'>
        <Radio value='public_transport'>Public transport</Radio>
        <Radio value='private_car_taxi'>Private car or taxi</Radio>
        <Radio value='biking'>Biking</Radio>
      </Stack>
    </RadioGroup> */}
  </>
}