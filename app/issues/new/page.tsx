'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import Link from 'next/link';

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'), 
    {ssr: false}
)

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit( async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occured');
        }
    });

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-3' color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}
            <form className='space-y-3' 
                onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                
                <Controller 
                    name='description' 
                    control={control} 
                    render={({field}) => 
                    <SimpleMDE placeholder="Description" {...field} />} 
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <div className='flex space-x-2'>
                    <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
                    <Button disabled={isSubmitting}>
                        <Link href='/issues'>Back</Link>
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default NewIssuePage