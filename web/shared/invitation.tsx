import React from "react";
import { QrCodeImage } from "./qr-code-image";
import { InviteCore } from "./invite-core";
import { InviteDetails } from "./invite-details";

interface InvitationProps {
  family_name: string;
  id: string;
}
const width = '148mm';
const height = '210mm';

export function Invitation(props: InvitationProps) {
  return <>
    <InvitationFront {...props} />
    <InvitationBack {...props} />
  </>;
}

function InvitationFront({ family_name, id }: InvitationProps) {
  return <div className="page-break-avoid bg-gray-200 bg-flowers border flex flex-col justify-center" style={{ width, height }}>
    <div className="transform mb-16 font-pinyon-script text-center flex flex-col items-center gap-8">
      <div className="text-5xl">{family_name}</div>
      <p className="font-serif">Please join us to celebrate the wedding of</p>
    </div>
    <div>
      <InviteCore />
    </div>
  </div>;
}

function InvitationBack({ family_name, id }: InvitationProps) {
  const isLocalHost = location.origin.includes('localhost');
  return <div className="page-break-avoid bg-gray-200 bg-flowers border flex flex-col justify-center" style={{ width, height }}>
    <div className="transform mt-16 mb-4 font-pinyon-script text-center flex flex-col items-center gap-8">
      <div className="text-3xl">{family_name}</div>
    </div>
    <div className="mx-10">
      <InviteDetails />
    </div>
    <div className="items-center flex flex-col w-full mt-10 gap-2 mb-10">
      <div className="text-xs">↓↓↓ RSVP link ↓↓↓</div>
      <QrCodeImage url={`${location.origin}/rsvp?id=${id}`} />
      {isLocalHost && <h4 className="text-red-500 font-bold text-3xl">WARNING THIS IS LOCALHOST</h4>}
    </div>
  </div>;
}
