
import Link from 'next/link';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons';

interface IOwnProps {
  message: string;
}

export default function ErrorBanner({ message }: IOwnProps) {
  return <Flex height='100vh' justifyContent={'center'} alignItems={'center'}>
    <Stack>
      <Alert status='error'>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Link href='/find'>
        <Button leftIcon={<ArrowBackIcon />} colorScheme='teal'>Back</Button>
      </Link>
    </Stack>
  </Flex>
}