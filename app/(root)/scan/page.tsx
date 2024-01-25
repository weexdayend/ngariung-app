'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { QrScanner } from "react-qrcode-scanner";
import { useToast } from "@/components/ui/use-toast"

function Page () {
  const { toast } = useToast()

  const [qrcode, setQrcode] = useState<string | 'scan qrcode first!'>('scan qrcode first!');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleScan = (value: any) => {
    setQrcode(value)
  }

  const handleError = (error: any) => {
    console.log({error})
  }

  useEffect(() => {
    // The effect function runs after each render
    // Here, we can compare the previous and current values of qrcode

    // Use a second piece of state to store the previous value
    // Initialize it with the initial value of qrcode
    let prevQrcode = qrcode;

    // Update the previous value and check if the button should be disabled
    setIsDisabled(prevQrcode === qrcode);

    // Update the previous value for the next render
    prevQrcode = qrcode;

  }, [qrcode]); // The effect depends on the qrcode state

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
