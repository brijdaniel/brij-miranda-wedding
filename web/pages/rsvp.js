import React from 'react';
import { DB } from '../utils/init-firebase';

export default function Page() {
    const [guestDoc, setGuestDoc] = React.useState();
    const [status, setStatus] = React.useState('loading');
    const [guestId, setGuestId] = React.useState('loading');

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const guestId = params.id;
        setGuestId(guestId);

        DB.collection('guests').doc(guestId).get()
            .then(res => {
                if (!res.exists) {
                    setStatus('not-found');
                } else {
                    setStatus('loaded');
                    setGuestDoc(res.data())
                }
            });
    }, []);

    if (status === 'loading') {
        return <h1>Loading</h1>
    }
    if (status === 'not-found') {
        return <h1>Guest '{guestId}' Not Found</h1>
    }

    return (
        <div>
            <h1>RSVP</h1>
            <h2>Name: {guestDoc && guestDoc.first_name}</h2>
            <h2>Images: (Coming Soon)</h2>
        </div>
    )
}

Page.isPublic = true;
