export function InviteDetails() {
  const PHONE = '0437090088';
  return <>
    <div className="transform text-6xl font-pinyon-script flex flex-col items-center">
      <div className="items-end mt-20">
        <p className="">Details</p>
      </div>
    </div>
    <div className="w-full flex flex-col items-center">
      <div className="font-serif flex flex-col items-center gap-3 text-center">
        <p className="">15 Onkaparinga Valley Rd, Verdun SA 5245</p>
        <p className="">Bus transportation will be available, please let us know your preferences in your RSVP!</p>
        <p className="">If you have any questions, or would like recommendations for accomodation, please contact Miranda on <a className="underline text-blue-600" href={"tel:" + PHONE}>{PHONE}</a></p>
        <p className="">Our Wedding is an 18+ event</p>
        <p className="">Thank you for your understanding</p>
      </div>
    </div>
  </>
}