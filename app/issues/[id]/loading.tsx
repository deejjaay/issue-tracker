import { Button, Heading, Flex, Card, Box } from '@radix-ui/themes';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Button mb="5">
          <Link href='/issues'>Back</Link>
      </Button>

      <Heading><Skeleton /></Heading>
      <Flex className='space-x-3' my="2">
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage