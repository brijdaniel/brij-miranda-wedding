import React from 'react';
import { DB } from '../../utils/init-firebase';
import { TextField, TextAreaField } from '../../shared/fields';
import { Header } from '../../shared/header';
import { Family, FamilyGuestDoc } from 'shared/guest.model';

export default function Page() {
    const [familyName, setFamilyName] = React.useState<string>();
    const [address, setAddress] = React.useState<string>();
    const [guests, setGuests] = React.useState<FamilyGuestDoc[]>();
    const [loaded, setLoaded] = React.useState(true);

    const triggerClearForm = () => {
        setLoaded(false);
        setLoaded(true);
    }

    const onSubmit = () => {
        const family: Family = {
            family_name: familyName,
            address: address,
            guests: guests
        }
        console.log('submitting', {family});
        DB.collection('families').add(family).then(() => {
            triggerClearForm();
        });
    };

    const isFormInvalid = !familyName || !guests || guests.length < 1 || !address;

    return (
        <>
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Add', href: '/guests/add' }]}></Header>
            <div className="container mx-auto">
                {loaded && <div className="px-3">
                    <TextField label="Family Name" onChange={setFamilyName} />
                    <TextAreaField label="Address" onChange={setAddress} />

                    <Guests onChange={setGuests} />

                    <button disabled={isFormInvalid} type="button" onClick={onSubmit} className="btn btn-primary mt-5">Save Family</button>
                </div>}
            </div>
        </>
    )
}

function RandId() {
    return Math.random().toString(32).slice(2, 10);
}

interface GuestsProps {
    onChange: (res: FamilyGuestDoc[]) => any
}

function Guests(props: GuestsProps) {
    const [guests, setGuests] = React.useState<FamilyGuestDoc[]>([]);

    React.useEffect(() => {
        props.onChange(guests);
    }, [guests]);

    const guestChanged = (newGuest: FamilyGuestDoc, index: number) => {
        guests[index] = newGuest;
        setGuests([...guests]);
    }

    const onClickAdd = () => {
        guests.push({ id: RandId(), first_name: '', last_name: '' });
        setGuests([...guests]);
    }

    const onClickRemove = (index: number) => {
        const guestsNews = [...guests.slice(0, index), ...guests.slice(index + 1)];
        setGuests(guestsNews);
    }

    return <div className="flex flex-col">
        <button type="button" onClick={onClickAdd} className="btn btn-primary mt-5">Add Member</button>
        {guests && guests.map((guest, index) =>
            <Guest
                key={guest.id}
                id={guest.id}
                onChange={(res) => guestChanged(res, index)}
                onDelete={() => onClickRemove(index)}
            />
        )}
    </div>
}

interface GuestProps {
    id: string;
    onChange: (res: FamilyGuestDoc) => any;
    onDelete: () => any;
}

function Guest(props: GuestProps) {
    const [firstName, setFirstName] = React.useState<string>();
    const [lastName, setLastName] = React.useState<string>();

    React.useEffect(() => {
        props.onChange({
            id: props.id,
            first_name: firstName,
            last_name: lastName
        });
    }, [firstName, lastName]);

    return <div className="grid grid-cols-2 gap-2">
        <TextField label="First Name" onChange={setFirstName} />
        <div className="flex items-end gap-2 flex-grow">
            <div className="flex-grow"><TextField label="Last Name" onChange={setLastName} /></div>
            <button className="btn" onClick={props.onDelete}>Delete</button>
        </div>
    </div>
}
