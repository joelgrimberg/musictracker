import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '../ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TrackSources } from '../../../contract'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useEffect } from 'react'
import { client } from '@/client'
import { Separator } from '../ui/separator'

const trackFormSchema = z.object({
    url: z.string().url(),
    title: z
        .string()
        .min(2, {
            message: "Track title must be at least 2 characters.",
        })
        .max(80, {
            message: "Track title must not be longer than 80 characters.",
        }),
    artist: z.string().optional(),
    coverUrl: z.string().url().optional(),
    source: z.nativeEnum(TrackSources)
});

type TrackFormValues = z.infer<typeof trackFormSchema>;
const defaultValues: Partial<TrackFormValues> = {
    source: TrackSources.YouTube,
    artist: "",
    url: "",
    title: ""
}
function AddMusicDialog() {
    const form = useForm<TrackFormValues>({
        resolver: zodResolver(trackFormSchema),
        defaultValues,
        mode: "onChange",
    });
    const url = form.watch("url");
    const source = form.watch('source')
    const title = form.watch('title');
    const urlState = form.getFieldState("url")

    useEffect(() => {
        if (!urlState.invalid && url != '' && title == '') {
            client.getMetaForMedia.query({ query: { source, url } })
                .then(({ body, status }) => {
                    if (status === 200) {
                        if (body.artist) {
                            form.setValue('artist', body.artist, { shouldTouch: false });
                        }
                        form.setValue('title', body.title, { shouldTouch: false })
                        form.setValue('coverUrl', body.coverUrl, { shouldTouch: false })
                    }
                    if (status === 404) {
                        form.setError('url', { message: body.message });
                    }
                })
        }
    }, [urlState, url, source, title, form]);

    const onSubmit = (values: TrackFormValues) => {
        console.log({ values })
    }
    return (
        <Dialog>
            <DialogTrigger className={buttonVariants()}>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                Add music
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Music</DialogTitle>
                    <DialogDescription>Add tracks to your collection</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>YouTube Video URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the URL of a YouTube video you want to use.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Never gonna give you up" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="artist"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Artist</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rick Astley" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coverUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Album cover URL:</FormLabel>
                                    <FormControl>
                                        <div className='flex gap-2 items-center'>
                                            <img src={field.value} className='w-20 h-auto' title='cover image' />
                                            <Input placeholder="http://img/albumcover-picture.jpg" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Add Music</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMusicDialog