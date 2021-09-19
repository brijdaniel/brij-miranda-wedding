import React from 'react';
import { ButtonToggleField, SelectField, TextAreaField } from '../shared/fields';
import { LoadingScreen } from '../shared/loading-screen';
import { ErrorScreen } from '../shared/error-screen';
import { useRouter } from 'next/router';
import { DB } from '../utils/init-firebase';
import { Family, GuestResponseDoc } from 'shared/guest.model';
import Router from 'next/router'

export default function Page() {
  const [guestDoc, setGuestDoc] = React.useState<Family>();
  const [status, setStatus] = React.useState('loading');
  const [statusDetail, setStatusDetail] = React.useState('loading');
  const [guestId, setGuestId] = React.useState<string>();

  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const guestId = router.query.id as string;
    setGuestId(guestId);
  }, [router]);

  React.useEffect(() => {
    if (!guestId) {
      return;
    }
    DB.collection('families').doc(guestId).get()
      .then(res => {
        console.log('retrieved guest: ', { res, exists: res.exists, data: res.data(), guestId });
        if (!res.exists) {
          setStatus('error')
          setStatusDetail(`Guest with id=${guestId} was not found!`);
        } else {
          setGuestDoc(res.data() as Family)
          setStatus('loaded');
        }
      })
      .catch(err => setStatus(err.toString()))
  }, [guestId])

  const onSubmit = async (result) => {
    console.log('updating response: ', { result, guestId });
    DB.collection('guest-responses').doc(guestId).set(result, { merge: true });
    await new Promise((resolve) => setTimeout(resolve, 1000)); // making a 1s 'sleep' so the gif will display before re-route
    Router.push('/info')
  }

  if (status === 'loading') {
    return <LoadingScreen label="Finding guest information" />
  }

  if (status === 'error') {
    return <ErrorScreen label={statusDetail} />
  }

  const familyName = guestDoc.family_name;

  return (
    <div className="w-full min-h-screen bg-base-200 bg-flowers" >
      <div className="mx-auto max-w-md px-3 flex flex-col align-center text-center">
        <p className="guest">Dear {familyName}</p>
        <p className="eventannouncement">You're invited to the wedding of Brij Daniel and Miranda Green</p>
        <RsvpForm
          guestId={guestId}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

const dietaryOptions = [
  { label: 'None', value: 'none' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Gluten Free', value: 'gf' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Dairy Free', value: 'dairy-free' },
  { label: 'Other', value: 'other' },
]

const areYouComingOptions = [
  { label: 'Yes', subLabel: 'I\'d Love to Attend', value: 'yes' },
  { label: 'Sorry', subLabel: 'I can\'t make it', value: 'no' },
]

const wouldYouLikeTransportOptions = [
  { label: 'Yes', subLabel: 'Yes Please!', value: 'yes' },
  { label: 'No', subLabel: 'No Thanks', value: 'no' },
]

const transportLocationOptions = [
  { label: 'Hahndorf', value: 'Hahndorf' },
  { label: 'CBD', value: 'CBD' },
]

function GifComponent() {
  return (
    <img width={200} height={200} src='/tick.gif' />
  );
}

interface RsvpFormProps {
  guestId: string,
  onSubmit: (result: GuestResponseDoc) => any
}

function RsvpForm(props: RsvpFormProps) {
  const { guestId, onSubmit } = props
  const [dietOption, setDietOption] = React.useState('none');
  const [extraDietInfo, setExtraDietOption] = React.useState('');
  const [isSubmitted, setIsSubmited] = React.useState(false);
  const [areYouComingResult, setAreYouComingResult] = React.useState<string>();
  const [wouldYouLikeTransportResult, setWouldYouLikeTransportResult] = React.useState<string>('no');
  const [transportLocationResult, setTransportLocationResult] = React.useState('');
  const isComing = areYouComingResult === 'yes';
  const isNotComing = areYouComingResult === 'no';
  const isDietNone = dietOption === 'none';
  const isTransportNone = wouldYouLikeTransportResult === 'no';
  const isTransportRequired = !isTransportNone;

  const onClickedSubmit = () => {
    const resultObj: GuestResponseDoc = {
      is_coming: isComing,
      diet_option: dietOption,
      diet_extra_info: extraDietInfo,
      transport_required: isTransportRequired,
      transport_location: transportLocationResult,
      created_at: new Date().toISOString()
    }
    onSubmit(resultObj);
    setIsSubmited(true);
  }

  if (isSubmitted) {
    return <div className="flex justify-around mt-16"><GifComponent /></div>
  }

  return <div data-theme="mytheme">
    <ButtonToggleField label="Are you coming?" options={areYouComingOptions} onChange={setAreYouComingResult} />
    {isComing && <>
      <SelectField label="Dietary Requirements?" options={dietaryOptions} onChange={setDietOption} />
      {!isDietNone && <TextAreaField label="Any extra dietary information?" onChange={setExtraDietOption} />}
      <SelectField initialValue="no" label="Would you be interested in transport?" options={wouldYouLikeTransportOptions} onChange={setWouldYouLikeTransportResult} />
      {!isTransportNone && <SelectField label="Where from?" options={transportLocationOptions} onChange={setTransportLocationResult} />}
    </>}
    {isNotComing && <>
      <h2 className="mt-3">We're sorry to hear that, look forward to seeing you soon :)</h2>
    </>}
    <button disabled={!areYouComingResult} onClick={onClickedSubmit} className="my-3 btn btn-primary">Send Response</button>
  </div>
}
