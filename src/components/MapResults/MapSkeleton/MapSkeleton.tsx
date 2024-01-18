import {
  Stack,
  Grid,
  Skeleton,
}
  from '@chakra-ui/react'

export default function MapSkeleton() {
  return <Grid
    h='100vh'
    templateColumns='1fr 3fr'
    gap={2}
  >
    <Stack gap={3} overflow={'scroll'}>
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
      <Skeleton speed={0.5} height={'150px'} />
    </Stack>
    <Skeleton speed={0.5} height={'100%'} />
  </Grid >
}