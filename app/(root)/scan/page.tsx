'use client'

import { Button } from "@/components/ui/button";
import { set } from "mongoose";
import { useState } from "react";
import { QrScanner } from "react-qrcode-scanner";

function Page () {

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
          flipHorizontally = {false}
          delay = {800}
          resolution = {800}
          aspectRatio = '4:4'
        />
      </div>
      <div className="w-full h-fit px-4 py-3 bg-gray-100 rounded-lg">
        <h1>{qrcode}</h1>
      </div>
      <Button type='submit' className='bg-indigo-600 sm:w-full md:w-fit lg:w-fit rounded-full'>
        Post
      </Button>
    </div>
  );
};

export default Page;
