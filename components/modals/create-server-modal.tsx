"use client";

import axios from "axios"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogHeader
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }),
    imageUrl: z.string().min(1, {
        message: "Image URL is required"
    })
})

export const CreateServerModal = () => {

    const {type, isOpen, onClose} = useModal()
    const isModalOpen = isOpen && type=="createServer"
    const router = useRouter();
    
    const form = useForm({
        defaultValues: {
            name: "",
            imageUrl: "",
        },
        resolver: zodResolver(formSchema)
    })

    

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.post("/api/servers", values);
            form.reset();

            router.refresh();
            onClose();
        }catch(error){ 
            console.log(error)
        }
        // console.log(form.formState.isValid)
        // console.log(form.formState.isLoading)
    }

    const handleClose = ()=>{
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Customize you server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and image. you can alswas change it later
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                name="imageUrl"
                                control={form.control}
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload 
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                            />

                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Server Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={form.formState.isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0
                                    text-black focus-visible:ring-offset-0"
                                                placeholder="Enter Server Name"
                                                // this destructured feild will handle all onClick onChange
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                                <Button disabled={form.formState.isSubmitting || !form.formState.isValid} variant={"primary"}>Create</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}