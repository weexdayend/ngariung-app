"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";

import Image from "next/image";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import React from "react";
 
type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "public",
    label: "Public",
  },
  {
    value: "private",
    label: "Private",
  },
]

interface Props {
  userId: string;
  avatar: string;
}

function PostThread({ userId, avatar }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<Status | { value: "public", label: "Public" }>(
    { value: "public", label: "Public" }
  )

  const { reset } = useForm()

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const textWithPlaceholder = values.thread.replace(/\n/g, '{{newline}}');

    await createThread({
      text: textWithPlaceholder,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      type: selectedStatus
    });

    form.reset()

    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        className='mt-10 flex flex-col gap-6 p-7 py-6 border-y border-gray-200'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-4">
          <div className='relative h-11 w-11'>
            <Image
              src={avatar}
              alt='user_community_image'
              fill
              className='cursor-pointer rounded-full'
            />
          </div>
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-3 no-focus ring-0'>
                <FormControl className='no-focus ring-0 text-gray-700'>
                  <Textarea 
                    rows={8} {...field}
                    placeholder="What is happening?!"
                    style={{ resize: 'none' }}
                    className="border-0 rounded-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="w-full flex flex-row gap-2 items-center justify-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="default"
                className="w-fit justify-start rounded-full"
              >
                {selectedStatus ? (
                  <>
                    {selectedStatus.label}
                  </>
                ) : (
                  <>+ Set status</>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Change status..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {statuses.map((status) => (
                      <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={(value) => {
                          setSelectedStatus(
                            statuses.find((priority) => priority.value === value) ||
                              { value: "public", label: "Public" }
                          )
                          setOpen(false)
                        }}
                      >
                        <span>{status.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button type='submit' className='bg-indigo-600 w-fit rounded-full'>
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostThread;