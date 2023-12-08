'use client'
import { Button, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;



const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    return (
        <form className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push('/issues')
            })}>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage >{errors.title?.message}</ErrorMessage>
            <Controller name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />
                } />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Button>Submit new issue</Button>
        </form>
    )
}

export default NewIssuePage