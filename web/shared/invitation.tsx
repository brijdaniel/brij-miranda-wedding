import React from "react";
import { QrCodeImage } from "./qr-code-image";

interface InvitationProps {
  family_name: string;
  id: string;
}

export function Invitation({ family_name, id }: InvitationProps) {
  const width = '500px';
  const height = '800px';

  return <div className="bg-gray-200 bg-flowers border" style={{ width, height }} >
    <div className="transform -skew-y-3 my-8 font-pinyon-script my-20 text-center">
      <div className="text-4xl">Dear {family_name}</div>
      <div className="text-2xl">You're cordially invited to the wedding of</div>
    </div>
    <div className="transform -skew-y-12 text-6xl font-pinyon-script flex flex-col items-center">
      <p className="">Brij</p>
      <p className="font-sans">{'&'}</p>
      <p className="text-7xl">Miranda</p>
    </div>
    <div className="w-full flex flex-col items-end mt-24">
      <div className="font-serif flex flex-col gap-3 items-start mr-12">
        <p className="text-2xl">5th March, 2022</p>
        <p className="">4:30pm Ceremony, Reception to follow</p>
        <p className="">Maximilians, Verdun SA</p>
        <p className="">RSVP by: 5th January, 2022</p>
      </div>
    </div>
    <div className="items-center flex flex-col w-full">
      <div className="relative">
        <h4 className="z-10 -left-24 bottom-12 absolute text-gray-200">{'RSVP here! ->'}</h4>
        <QrCodeImage url={`${location.origin}/rsvp?id=${id}`} />
      </div>
    </div>
  </div>;
}
