import { Box } from '@radix-ui/themes';
import { Skeleton } from '@/app/components'

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height='24.5rem' />
    </Box>
  )
}

export default LoadingNewIssuePage