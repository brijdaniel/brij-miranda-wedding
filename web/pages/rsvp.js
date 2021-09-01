import React from 'react';
import { ButtonToggleField, SelectField, TextAreaField } from '../shared/fields';
import { LoadingScreen } from '../shared/loading-screen';
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
    }, []);

    React.useEffect(() => {
        DB.collection('guests').doc(guestId).get()
            .then(res => {
                console.log('retrieved guest: ', {res, exists: res.exists, data: res.data(), guestId});
                if (!res.exists) {
                    setStatus(`Guest with id=${guestId} was not found!`);
                } else {
                    setStatus('loaded');
                    setGuestDoc(res.data())
                }
            })
            .catch(err => setStatus(err.toString()))
    }, [guestId])

    const onSubmit = (result) => {
        console.log('updating response: ', {result, guestId});
        DB.collection('guest-responses').doc(guestId).set(result, {merge: true});
    }

    if (status === 'loading') {
        return <LoadingScreen label="Finding guest information" />
    }
    if (status !== 'loaded' || !guestDoc) {
        return <h1>Guest '{guestId}' Not Found</h1>
    }

    return (
        <RsvpStateless
            firstName={guestDoc.first_name}
            lastName={guestDoc.last_name}
            address={guestDoc.address}
            onSubmit={onSubmit}
        />
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

function RsvpStateless({ firstName, lastName, address, onSubmit }) {
    const [dietOption, setDietOption] = React.useState('none');
    const [extraDietInfo, setExtraDietOption] = React.useState('');
    const [areYouComingResult, setAreYouComingResult] = React.useState('');
    const isComing = areYouComingResult === 'yes';
    const notComing = areYouComingResult === 'no';
    const isDietNone = dietOption === 'none';

    const onClickedSubmit = () => {
        const resultObj = {
            is_coming: isComing,
            diet_option: dietOption,
            diet_extra_info: extraDietInfo,
            created_at: new Date().toISOString()
        }
        onSubmit(resultObj);
    }

    return <div className="w-full min-h-screen bg-base-200">
        <div className="mx-auto max-w-md flex flex-col align-center text-center">
            <p className="text-3xl font-bold my-4">RSVP</p>
            <p className="text-5xl">Dear {firstName} {lastName}</p>
            <p className="mb-5">You've been invited to the wedding of Brij and Miranda Daniel</p>

            <table className="table w-full table-compact my-4">
                <tbody>
                    <tr><td>Name</td><td>{firstName} {lastName}</td></tr>
                    <tr><td>Address</td><td>{address}</td></tr>
                </tbody>
            </table>

            <h1 className="mt-5 mb-3">Your Response</h1>
            <div>
                <ButtonToggleField label="Are you coming?" options={areYouComingOptions} onChange={setAreYouComingResult} />
                {isComing && <>
                    <SelectField label="Dietary Requirements?" options={dietaryOptions} onChange={setDietOption} />
                    {!isDietNone && <TextAreaField label="Any extra dietary information?" onChange={setExtraDietOption} />}
                </>}
                {notComing && <>
                    <h2 className="mt-3">We're sorry to hear that, look forward to seeing you soon :)</h2>
                </>}
            </div>
            <button disabled={!areYouComingResult} onClick={onClickedSubmit} className="my-3 btn btn-primary">Send Response</button>
        </div>
    </div>
}

Page.isPublic = true;
