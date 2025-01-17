import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link'
import { notFound } from 'next/navigation';
import ReactMarkDown from 'react-markdown';
import delay from 'delay';
interface Props {
    params: {id: string}
}

const IssueDetailPage = async ({params}: Props) => {

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!issue)
        notFound();

    await delay(2000);

    return (
        <div>
            <Button mb="5">
                <Link href='/issues'>Back</Link>
            </Button>

            <Heading>{issue.title}</Heading>
            <Flex className='space-x-3' my="2">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt="4">
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    )
}

export default IssueDetailPage