import React from 'react';
import { useRouter } from 'next/router';
import { Invitation } from "shared/invitation";
import { getDocument } from '../../../utils/firebase-wrapper';
import { Family } from 'shared/guest.model';
import { LoadingScreen } from 'shared/loading-screen';



export default function Page() {
    const [guestDoc, setGuestDoc] = React.useState<Family>();
    const [status, setStatus] = React.useState('loading');
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
        getDocument('families', guestId)
          .then(res => {
            console.log('retrieved guest: ', { res, exists: res.exists, data: res.data(), guestId });
            if (!res.exists) {
              setStatus('error')
            } else {
              setGuestDoc(res.data() as Family)
              setStatus('loaded');
            }
          })
          .catch(err => setStatus(err.toString()))
      }, [guestId])

    if (status === 'loaded') {
      const familyName = guestDoc?.family_name;
      return <>
          <Invitation 
            family_name={familyName} 
            id={guestId} 
            customGreeting={guestDoc.custom_greeting}
            extraDetails={guestDoc.extra_details}
          />
      </>;
    }
    return <LoadingScreen label="Loading invitation information..." />
}
