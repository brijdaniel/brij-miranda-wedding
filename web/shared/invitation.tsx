import React from "react";
import { QrCodeImage } from "./qr-code-image";
import { InviteCore } from "./invite-core"

interface InvitationProps {
  family_name: string;
  id: string;
}

export function Invitation({ family_name, id }: InvitationProps) {
  const width = '500px';
  const height = '800px';

  return <div className="page-break-avoid bg-gray-200 bg-flowers border" style={{width, height}}>
    <div className="transform -skew-y-3 my-8 font-pinyon-script my-20 text-center">
      <div className="text-4xl">Dear {family_name}</div>
      <div className="text-2xl">You're cordially invited to the wedding of</div>
    </div>
    
    <div>
      <InviteCore />
    </div>
    
    <div className="items-center flex flex-col w-full">
      <div className="relative">
        <h4 className="z-10 -left-24 bottom-12 absolute text-gray-200">{'RSVP here! ->'}</h4>
        <QrCodeImage url={`${location.origin}/rsvp?id=${id}`} />
      </div>
    </div>
  </div>;
}
