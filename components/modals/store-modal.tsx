"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import axios from "axios"
import { toast } from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  // ✅ Using selector syntax to enable reactivity
  const isOpen = useStoreModal((state) => state.isOpen);
  const onClose = useStoreModal((state) => state.onClose);

  const [loading,setLoading]= useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
  
      const response = await axios.post('/api/stores', values);
      window.location.assign('/$(response.data.id)')

    } catch (error) {
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  


  console.log("StoreModal rendered, isOpen:", isOpen); // Debug: should print on state change

  return (
    <Modal
      title="Store Modal"
      description="Store Modal Description"
      isOpen={isOpen}
      onClose={onClose}
    >
    <div className="space-y-4 py-2 pb-4">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="E-Commerce" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="pt-6 space-x-2 flex items-center justify-end">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button disabled={loading} type="submit">Continue</Button>
      </div>
    </form>
  </Form>
</div>

    </Modal>
  );
};
