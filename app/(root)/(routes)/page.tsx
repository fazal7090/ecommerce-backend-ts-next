"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Modal } from "@/components/ui/model";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  
const onOpen = useStoreModal((state) => state.onOpen);
const isOpen = useStoreModal((state) => state.isOpen);
// here state is basically the object returned by use store model and it contains all the function s and parameters of use state model
 useEffect(() => {
  console.log("Opening modal from Home page");
  if (!isOpen) {
    onOpen();// calling Zustand’s onOpen() method when isOpen is false,
  }
 }, [isOpen, onOpen]);

  return null;
}
