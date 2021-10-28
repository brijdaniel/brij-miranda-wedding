import React from 'react';
import { LoadingScreen } from '../shared/loading-screen';
import { ErrorScreen } from '../shared/error-screen';
import { useRouter } from 'next/router';
import { getDocument, setDocument } from '../utils/firebase-wrapper';
import { Family, FamilyResponseDoc } from 'shared/guest.model';
import Router from 'next/router'
import { RsvpForm } from 'shared/rsvp-form';
import { TickAnimated } from 'shared/tick-animated';

type StatusString = 'loading' | 'error' | 'loaded' | 'submitting';

export default function Page() {
  const [familyDoc, setFamilyDoc] = React.useState<Family>();
  const [familyPreviousResponse, setFamilyPreviousResponse] = React.useState<FamilyResponseDoc>();
  const [status, setStatus] = React.useState<StatusString>('loading');
  const [statusDetail, setStatusDetail] = React.useState('loading');
  const [familyId, setFamilyId] = React.useState<string>();

  const router = useRouter();

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const familyId = router.query.id as string;
    setFamilyId(familyId);
  }, [router]);

  React.useEffect(() => {
    if (!familyId) {
      return;
    }
    getDocument('families', familyId)
      .then(res => {
        console.log('retrieved guest: ', { res, exists: res.exists, data: res.data(), familyId });
        if (!res.exists) {
          setStatus('error')
          setStatusDetail(`Guest with id=${familyId} was not found!`);
        } else {
          setFamilyDoc(res.data() as Family)
          setStatus('loaded');
        }
      })
      .catch(err => setStatus(err.toString()))
  }, [familyId])

  React.useEffect(() => {
    if (!familyId) {
      return;
    }
    getDocument('family-responses', familyId)
      .then(res => {
        console.log('retrieved guest: ', { res, exists: res.exists, data: res.data(), familyId });
        if (res.exists) {
          setFamilyPreviousResponse(res.data() as FamilyResponseDoc);
        }
      })
      .catch(err => setStatus(err.toString()))
  }, [familyId])

  const onSubmit = async (result: FamilyResponseDoc) => {
    setStatus('submitting');
    result.id = familyId;
    console.log('updating response: ', { result, familyId });
    setDocument(['family-responses', familyId], result);
    setTimeout(() => {
      // making a 1000ms 'sleep' so the gif will display before re-route
      Router.push('/');
    }, 1000);
  }

  if (status === 'loading') {
    return <LoadingScreen label="Finding guest information" />
  }

  if (status === 'error') {
    return <ErrorScreen label={statusDetail} />
  }

  if (status === 'submitting') {
    return <div className="w-full flex flex-col items-center mt-16">
      <TickAnimated width={150} />
      <p className="text-6xl font-pinyon-script text-green-500 font-bold pr-10">Done!</p>
    </div>
  }

  const familyName = familyDoc.family_name;

  return (
    <div className="w-full min-h-screen bg-base-200 bg-flowers" >
      <div className="mx-auto max-w-md px-3 flex flex-col align-center text-center">
        <p className="guest">{familyName}</p>
        <p className="eventannouncement">Please join us to celebrate the wedding of</p>
        <p className="eventannouncement">Brij Daniel and Miranda Green</p>
        <RsvpForm onSubmit={onSubmit} familyDoc={familyDoc} previousResponse={familyPreviousResponse} />
      </div>
    </div>
  )
}
