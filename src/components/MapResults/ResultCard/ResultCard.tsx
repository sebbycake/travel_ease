import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react'
import { DistanceRankingResult } from '@/pages/api/distance'
import { StarIcon } from '@chakra-ui/icons'
import { Flex, Stack } from '@chakra-ui/react'

interface DistanceResult {
  data: DistanceRankingResult;
  rank: number;
  activeCard: number;
  handleClick: (rank: number) => void;
}

const FIRST = 0;
const SECOND = 1;
const THIRD = 2;

export default function ResultCard({ data, rank, activeCard, handleClick }: DistanceResult) {
  return <div>
    <Card
      size={'md'}
      cursor={'pointer'}
      variant={rank === activeCard ? 'filled' : 'elevated'}
      onClick={() => handleClick(rank)}>
      <CardHeader>
        <Stack gap={3}>
          <Flex gap={2} alignItems={'center'}>
            {rank === FIRST && <StarIcon w={9} h={9} color='#FFD700' />}
            {rank === SECOND && <StarIcon w={7} h={7} color='#C0C0C0' />}
            {rank === THIRD && <StarIcon w={5} h={5} color='#CD7F32' />}
            <Heading size='sm'>{data.name}</Heading>
          </Flex>
          <Text>{data.address}</Text>
        </Stack>
      </CardHeader>
      <CardBody>
        <Text>Average distance: {data.avg_distance} km </Text>
        <Text>Average duration: {data.avg_duration} minutes </Text>
      </CardBody>
    </Card>
  </div>
}