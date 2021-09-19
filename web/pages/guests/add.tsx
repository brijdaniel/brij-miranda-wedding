import React from 'react';
import { DB } from '../../utils/init-firebase';
import { Header } from '../../shared/header';
import { Family } from 'shared/guest.model';
import { FamilyForm } from 'shared/family-form';

export default function Page() {
    const [loaded, setLoaded] = React.useState(true);

    const triggerClearForm = () => {
        setLoaded(false);
        setLoaded(true);
    }

    const onSubmit = (family: Family) => {
        console.log('adding family', {family});
        DB.collection('families').add(family).then(() => {
            triggerClearForm();
        });
    };

    return (
        <>
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Add', href: '/guests/add' }]}></Header>
            <div className="container mx-auto">
                {loaded && <div className="px-3">
                <FamilyForm onSubmit={onSubmit} />
                </div>}
            </div>
        </>
    )
}
