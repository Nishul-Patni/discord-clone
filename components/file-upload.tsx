"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"

import Image from "next/image";

import { X } from "lucide-react";

interface FileUploadProps {
    onChange : (url? : string) => void;
    endpoint : "messageFile" | "serverImage";
    value : string;
}

export const FileUpload = ({onChange, endpoint, value} : FileUploadProps) => {
    
    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf"){
        return (
            <div className="relative h-20 w-20">
                <Image 
                fill
                src={value}
                alt="Upload"
                sizes="full"
                className="rounded-full"
                />
                <button className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
                    <X className="h-4 w-4" 
                    onClick={()=> {onChange("")}}
                    />
                </button>
            </div>
        )
    }
    
    return (
        <div>
            <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res)=>{
                console.log(res);
                onChange(res?.[0].url);
            }}
            onUploadError={(error : Error)=>{
                console.log(error)
            }}
            />
        </div>
    )
}