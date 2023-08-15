import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '../ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { TrackSources } from '../../../contract'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useEffect } from 'react'
import { client } from '@/client'

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
        mode: "onChange"
    });
    const url = form.watch('url');
    const { watch, getFieldState, setValue } = form;
    useEffect(() => {
        const subscription = watch(({ url, source }, { name, type }) => {
            if (name === "url") {
                console.log(url)
                console.log(type)
                console.log(fieldState)
                if (!fieldState.invalid && fieldState.isTouched) {
                    console.log('getting meta')
                    client.getMetaForMedia.query({ query: { source, url } }).then(({ body, status }) => {
                        if (status === 200) {
                            if (body.artist) {
                                setValue('artist', body.artist);
                            }
                            setValue('title', body.title)
                        }
                    })
                }

            }

        })
        return () => subscription.unsubscribe()
    }, [watch, getFieldState, setValue])

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
                        <Tabs defaultValue={TrackSources.YouTube} className="space-y-6" onValueChange={(value) => { form.setValue('source', value as TrackSources) }}>
                            <div className="space-between flex items-center">
                                <TabsList >
                                    <TabsTrigger value={TrackSources.YouTube} className="relative" >
                                        YouTube music video
                                    </TabsTrigger>
                                    <TabsTrigger value={TrackSources.Spotify} className="relative">
                                        Spotify
                                    </TabsTrigger>
                                    <TabsTrigger value="local" className="relative">
                                        Local file
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent
                                value={TrackSources.YouTube}
                                className="border-none p-0 outline-none"
                            >
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

                            </TabsContent>
                            <TabsContent value={TrackSources.Spotify} className="border-none p-0 outline-none">
                                <FormField
                                    control={form.control}
                                    name="url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Spotify Song URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://open.spotify.com/track/6GQLX6Z28fYwDNCrhaKzYF?si=7861c9c8867f4935" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                This is the URL of a Spotify Song you want to use.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
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