import React from 'react';
import { ButtonToggleField, SelectField, TextAreaField } from '../shared/fields';
import { LoadingScreen } from '../shared/loading-screen';
import { ErrorScreen } from '../shared/error-screen';
import { useRouter } from 'next/router'; 
import { DB } from '../utils/init-firebase';
import { QrCodeImage } from '../shared/qr-code-image';
import { GuestDoc, GuestResponseDoc } from 'shared/guest.model';
import Router from 'next/router'

export default function Page() {
    const [guestDoc, setGuestDoc] = React.useState<GuestDoc>();
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
        DB.collection('guests').doc(guestId).get()
            .then(res => {
                console.log('retrieved guest: ', { res, exists: res.exists, data: res.data(), guestId });
                if (!res.exists) {
                    setStatus('error')
                    setStatusDetail(`Guest with id=${guestId} was not found!`);
                } else {
                    setGuestDoc(res.data() as GuestDoc)
                    setStatus('loaded');
                }
            })
            .catch(err => setStatus(err.toString()))
    }, [guestId])

    const onSubmit = (result) => {
        console.log('updating response: ', { result, guestId });
        DB.collection('guest-responses').doc(guestId).set(result, { merge: true });
        Router.push('/info')
    }

    if (status === 'loading') {
        return <LoadingScreen label="Finding guest information" />
    }

    if (status === 'error') {
        return <ErrorScreen label={statusDetail} />
    }

    const firstName = guestDoc.first_name;
    const lastName = guestDoc.last_name;
    const address = guestDoc.address;

    return (
        <div className="w-full min-h-screen bg-base-200">
            <div className="mx-auto max-w-md px-3 flex flex-col align-center text-center">
                <p className="text-3xl font-bold my-4">RSVP</p>
                <p className="text-5xl">Dear {firstName} {lastName}</p>
                <p className="mb-5">You've been invited to the wedding of Brij Daniel and Miranda Green</p>

                <table className="table w-full table-compact my-4">
                    <tbody>
                        <tr><td>Name</td><td>{firstName} {lastName}</td></tr>
                        <tr><td>Address</td><td>{address}</td></tr>
                    </tbody>
                </table>

                <h1 className="mt-5 mb-3">Your Response</h1>
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

type YesNo = 'yes' | 'no';

function RsvpForm({ guestId, onSubmit }) {
    const [dietOption, setDietOption] = React.useState('none');
    const [extraDietInfo, setExtraDietOption] = React.useState('');
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
    }

    return <div>
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
        {guestId && <div className="items-center flex flex-col max-w-full">
            <h4 className="mt-3 -mb-5 z-10">Guest QR Code</h4>
            <QrCodeImage url={`${location.origin}/rsvp?id=${guestId}`}  />
        </div>}
    </div>

}
