import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react'
import { DistanceRankingResult } from '@/pages/api/distance'
import { StarIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

interface DistanceResult {
  data: DistanceRankingResult
  rank: number;
}

const ORIGIN = 0;
const DISTANCE = 1;
const DURATION = 2;
const FIRST = 0;
const SECOND = 1;
const THIRD = 2;

export default function OriginCard({ data, rank }: DistanceResult) {
  return <div>
    <Card size={'md'}>
      <CardHeader>
        <Flex gap={2} alignItems={'center'}>
          {rank === FIRST && <StarIcon w={9} h={9} color='#FFD700' />}
          {rank === SECOND && <StarIcon w={7} h={7} color='#C0C0C0' />}
          {rank === THIRD && <StarIcon w={5} h={5} color='#CD7F32' />}
          <Heading size='md'>{data[ORIGIN]}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>Average Distance: {data[DISTANCE]} </Text>
        <Text>Average Duration: {data[DURATION]} </Text>
      </CardBody>
    </Card>
  </div>
}