"use client";
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";



const ModalInit = (props) => {
  return (
    <Dialog open={props.open} onOpenChange={props.closeModal}>
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle className="text-center text-2xl">{props.title}</DialogTitle>
        <DialogDescription className="flex  justify-center items-center">
          {props.content}
          {/* <Image
            src="/C13-L1-A2/Keep_Trying.jpg"
            width={300}
            height={200}
            alt="modle image"
            className="rounded-lg"
          /> */}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default ModalInit