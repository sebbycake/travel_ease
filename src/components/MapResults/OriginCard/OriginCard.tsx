import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react'
import { DistanceRankingResult } from '@/pages/api/distance'
import { StarIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

interface DistanceResult {
  data: DistanceRankingResult;
  rank: number;
  handleClick: (rank: number) => void;
}

const ORIGIN_ADDRESS = 0;
const DISTANCE = 2;
const DURATION = 3;
const FIRST = 0;
const SECOND = 1;
const THIRD = 2;

export default function OriginCard({ data, rank, handleClick }: DistanceResult) {
  return <div>
    <Card size={'md'} cursor={'pointer'} onClick={() => handleClick(rank)}>
      <CardHeader>
        <Flex gap={2} alignItems={'center'}>
          {rank === FIRST && <StarIcon w={9} h={9} color='#FFD700' />}
          {rank === SECOND && <StarIcon w={7} h={7} color='#C0C0C0' />}
          {rank === THIRD && <StarIcon w={5} h={5} color='#CD7F32' />}
          <Heading size='sm'>{data[ORIGIN_ADDRESS]}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>Average Distance: {data[DISTANCE]} km </Text>
        <Text>Average Duration: {data[DURATION] } minutes </Text>
      </CardBody>
    </Card>
  </div>
}