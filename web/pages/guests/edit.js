import React from 'react';
import { DB } from '../../utils/init-firebase';
import { TextField, TextAreaField } from '../../shared/fields';
import { Header } from '../../shared/header';
import { LoadingScreen } from '../../shared/loading-screen';

export default function Page() {
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [address, setAddress] = React.useState();

    const [guestDoc, setGuestDoc] = React.useState();
    const [guestId, setGuestId] = React.useState();
    const [loaded, setLoaded] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const guestId = params.id;
        setGuestId(guestId);
    }, []);

    React.useEffect(() => {
        if (!guestId) {
            return;
        }
        async function Get() {
            const res = await DB.collection('guests').doc(guestId).get()
            const docData = res.data();
            setGuestDoc(docData);
            setFirstName(docData.first_name);
            setLastName(docData.last_name);
            setAddress(docData.address);
            setLoaded(true);
        }
        Get().catch(err => console.error(err))
    }, [guestId]);

    const onSubmit = () => {
        console.log('submitting')
        setSaving(true);
        DB.collection('guests').doc(guestId).set({
            address: address,
            first_name: firstName,
            last_name: lastName,
        }, {merge: true}).then(() => {
            location.href = `${location.origin}/guests`
        });
    };

    const shouldDisable = !firstName || !lastName || !address;

    if (!loaded) {
        return <LoadingScreen />
    }

    return (
        <div className="container mx-auto">
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Edit', href: '/guests/edit' }]}></Header>
            {loaded && guestDoc && !saving && <div className="px-3">
                <TextField defaultValue={guestDoc.first_name} label="First Name" onChange={setFirstName} />
                <TextField defaultValue={guestDoc.last_name} label="Last Name" onChange={setLastName} />
                <TextAreaField defaultValue={guestDoc.address} label="Address" onChange={setAddress} />
            </div>}
            {saving && <div className="w-full text-center mt-8 pt-10">
                <h1>Saving...</h1>
                <h3>{firstName} {lastName}</h3>
            </div>}
            {!saving && <div className="w-full flex justify-around">
                <button disabled={shouldDisable} type="button" onClick={onSubmit} className="btn btn-primary mt-5">Save Guest</button>
            </div>}
        </div>
    )
}

