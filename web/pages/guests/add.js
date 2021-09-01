import React from 'react';
import { DB } from '../../utils/init-firebase';
import { TextField, TextAreaField } from '../../shared/fields';
import { Header } from '../../shared/header';

export default function Page() {
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [address, setAddress] = React.useState();
    const [loaded, setLoaded] = React.useState(true);

    const triggerClearForm = () => {
        setLoaded(false);
        setLoaded(true);
    }

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
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Add', href: '/guests/add' }]}></Header>
            {loaded && <div className="px-3">
                <TextField label="First Name" onChange={setFirstName} />
                <TextField label="Last Name" onChange={setLastName} />
                <TextAreaField label="Address" onChange={setAddress} />
            </div>}

            <button disabled={shouldDisable} type="button" onClick={onSubmit} className="btn btn-primary mt-5">Add Guest</button>
        </div>
    )
}

