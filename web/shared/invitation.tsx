import React from "react";
import { QrCodeImage } from "./qr-code-image";
import { InviteCore } from "./invite-core";

interface InvitationProps {
  family_name: string;
  id: string;
}

export function Invitation({ family_name, id }: InvitationProps) {
  const width = '148mm';
  const height = '210mm';

  return <div className="page-break-avoid bg-gray-200 bg-flowers border" style={{width, height}}>
    <div className="transform mt-8 mb-16 font-pinyon-script text-center flex flex-col items-center gap-8">
      <div className="text-5xl">{family_name}</div>
      <p className="font-serif">Please join us to celebrate the wedding of</p>    
    </div>
    <div>
      <InviteCore />
    </div>
    
    <div className="items-center flex flex-col w-full mt-4">
      <div className="relative">
        <h4 className="z-10 -left-24 bottom-12 absolute text-gray-200">{'RSVP here! ->'}</h4>
        <QrCodeImage url={`${location.origin}/rsvp?id=${id}`} />
      </div>
    </div>
  </div>;
}
