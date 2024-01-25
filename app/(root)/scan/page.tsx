'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { QrScanner } from "react-qrcode-scanner";
import { useToast } from "@/components/ui/use-toast"

function Page () {
  const { toast } = useToast()

  const [qrcode, setQrcode] = useState<string | 'scan qrcode first!'>('scan qrcode first!');
  const [newQrcode, setNewQrcode] = useState<string | ''>('');

  const handleScan = (value: any) => {
    setQrcode(value)
    if(value !== qrcode)setNewQrcode(value)
  }

  const handleError = (error: any) => {
    console.log({error})
  }

  const isDisabled = qrcode === newQrcode

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
        <h1>{newQrcode}</h1>
      </div>
      <Button 
        disabled={isDisabled}
        type='submit' 
        className='bg-indigo-600 sm:w-full md:w-fit lg:w-fit rounded-full'
        onClick={() => {
          toast({
            variant: "saka",
            title: "QR Code Scanned",
            description: "Participant has been scanned!",
          })
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default Page;
