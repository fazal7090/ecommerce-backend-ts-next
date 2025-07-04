"use client";

import { useEffect , useState } from "react";
import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
    console.log("ModalProvider");
       const [isMounted, setIsMounted] = useState(false);

       useEffect(() => {
        console.log("ModalProvider mounted");  
        setIsMounted(true);
       }, []);

       if (!isMounted) {
        return null;
       }
 
       return (
        <>
        <StoreModal />
        </>
       )
 }