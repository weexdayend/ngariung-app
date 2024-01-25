'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QrScanner } from "react-qrcode-scanner";
import { useToast } from "@/components/ui/use-toast"

function Page () {
  const { toast } = useToast()

  const [qrcode, setQrcode] = useState<string | 'testing-qrcode'>('testing-qrcode');

  const handleScan = (value: any) => {
    setQrcode(value)
  }

  const handleError = (error: any) => {
    console.log({error})
  }

  return (
    <div className="flex flex-col gap-4">
      <h1>Scan Page</h1>
      <div className="w-full h-fit">
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          facingMode = 'environment'
          constraints = {null}
          flipHorizontally = {true}
          delay = {800}
          resolution = {800}
          aspectRatio = '4:4'
        />
      </div>
      <div className="w-full h-fit px-4 py-3 bg-gray-100 rounded-lg">
        <h1>{qrcode}</h1>
      </div>
      <Button 
        type='submit' 
        className='bg-indigo-600 sm:w-full md:w-fit lg:w-fit rounded-full'
        onClick={() => {
          toast({
            variant: "saka",
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default Page;
