import React from 'react';
import { useRouter } from 'next/router';
import { Invitation } from "shared/invitation";
import { DB } from '../utils/init-firebase';
import { Family } from 'shared/guest.model';



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
        DB.collection('families').doc(guestId).get()
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

    const familyName = guestDoc.family_name;

    return <>
        <Invitation id={guestId} family_name={familyName} />
    </>;
}
