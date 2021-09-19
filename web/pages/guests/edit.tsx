import React from 'react';
import { DB } from '../../utils/init-firebase';
import { Header } from '../../shared/header';
import { LoadingScreen } from '../../shared/loading-screen';
import { Family } from 'shared/guest.model';
import { FamilyForm } from 'shared/family-form';

export default function Page() {
    const [familyDoc, setFamilyDoc] = React.useState<Family>();
    const [familyId, setFamilyId] = React.useState<string>();
    const [loaded, setLoaded] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const familyId = params.id;
        setFamilyId(familyId);
    }, []);

    React.useEffect(() => {
        if (!familyId) {
            return;
        }
        async function Get() {
            const res = await DB.collection('families').doc(familyId).get()
            const familyDoc = res.data() as Family;
            console.log({familyDoc});
            setFamilyDoc(familyDoc);
            setLoaded(true);
        }
        Get().catch(err => console.error(err))
    }, [familyId]);

    const onSubmit = (value: Family) => {
        console.log('submitting')
        setSaving(true);
        DB.collection('families').doc(familyId).set(value, { merge: true }).then(() => {
            location.href = `${location.origin}/guests`
        });
    };

    if (!loaded) {
        return <LoadingScreen />
    }

    return (
        <>
            <Header links={[{ label: 'Guests', href: '/guests' }, { label: 'Edit', href: '/guests/edit' }]}></Header>
            <div className="container mx-auto">
                {loaded && <div className="px-3">
                <FamilyForm initialValue={familyDoc} onSubmit={onSubmit} />
                </div>}
            </div>
        </>
    )
}

