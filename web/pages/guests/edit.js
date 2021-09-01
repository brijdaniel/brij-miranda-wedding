import React from 'react';
import { DB } from '../../utils/init-firebase';
import { TextField, TextAreaField } from '../../shared/fields';
import { Header } from '../../shared/header';

export default function Page() {
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [address, setAddress] = React.useState();
    const [guestDoc, setGuestDoc] = React.useState();
    const [loaded, setLoaded] = React.useState(false);

    const [guestId, setGuestId] = React.useState('loading');

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const guestId = params.id;
        setGuestId(guestId);
    }, []);

    const triggerClearForm = () => {
        setLoaded(false);
        setLoaded(true);
    }

    React.useEffect(() => {
        if (guestId) {
            DB.collection('guests').doc(guestId).get()
                .then(res => res.data())
                .then(docData => setGuestDoc(docData))
                .then(() => setLoaded(true))
                .catch(err => console.error(err))
        }
    }, [guestId]);

    const onSubmit = () => {
        console.log('submitting')
        DB.collection('guests').add({
            address: address,
            first_name: firstName,
            last_name: lastName,
        }).then(() => {
            triggerClearForm();
        });
    };

    const shouldDisable = !firstName || !lastName || !address;

    return (
        <div className="container mx-auto">
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Edit', href: '/guests/edit' }]}></Header>
            {loaded && guestDoc && <div>
                <TextField defaultValue={guestDoc.first_name} label="First Name" onChange={setFirstName} />
                <TextField defaultValue={guestDoc.last_name} label="Last Name" onChange={setLastName} />
                <TextAreaField defaultValue={guestDoc.address} label="Address" onChange={setAddress} />
            </div>}

            <button disabled={shouldDisable} type="button" onClick={onSubmit} className="btn btn-primary mt-5">Save Guest</button>
        </div>
    )
}

