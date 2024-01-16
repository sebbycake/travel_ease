import { useState, useEffect } from 'react'
import {
  Input,
  SimpleGrid,
  Stack,
  Radio,
  RadioGroup,
  Tooltip,
  FormLabel
}
from '@chakra-ui/react'

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
  const SRC_KEYS: Array<keyof typeof searchParams> = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"]
  const DEST_KEYS: Array<keyof typeof searchParams> = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10"]

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const initialParams: Partial<SearchParamsType> = {}

    SRC_KEYS.concat(DEST_KEYS).forEach((val) => {
      initialParams[val as keyof SearchParamsType] = queryParams.get(val) || ''
    })

    setSearchParams(initialParams as SearchParamsType);
  }, [])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setSearchParams(prev => {
      const updatedParams = { ...prev, [key]: event.target.value }
      const queryParams = new URLSearchParams(updatedParams).toString()
      const currentPath = window.location.pathname
      history.replaceState(null, "", `${currentPath}?${queryParams}`)
      return updatedParams
    })
  };

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
          SRC_KEYS.map((key, index) => <Input
            key={key}
            isRequired={index === 0}
            placeholder={`Enter location of source ${index + 1} ${index > 0 ? '(Optional)' : ''}`}
            value={searchParams[key]}
            focusBorderColor='black'
            onChange={(event) => handleChange(event, key)}
          />)
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
          DEST_KEYS.map((key, index) => <Input
            key={key}
            isRequired={index === 0}
            placeholder={`Enter location of destination ${index + 1} ${index > 0 ? '(Optional)' : ''}`}
            value={searchParams[key]}
            focusBorderColor='black'
            onChange={(event) => handleChange(event, key)}
          />)
        }
      </Stack>
    </SimpleGrid>

    <RadioGroup colorScheme='green'>
      <FormLabel as='legend'>
        Mode of Transport
      </FormLabel>
      <Stack direction='row'>
        <Radio value='public_transport'>Public transport</Radio>
        <Radio value='private_car_taxi'>Private car or taxi</Radio>
        <Radio value='biking'>Biking</Radio>
      </Stack>
    </RadioGroup>
  </>
}