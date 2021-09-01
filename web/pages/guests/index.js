import React from 'react';
import Link from 'next/link';
import { DB } from '../../utils/init-firebase';
import { Header } from '../../shared/header';
import { LoginWrapper } from '../../shared/login-wrapper';

export default function Wrapped() {
    return <LoginWrapper>
        <Page />
    </LoginWrapper>
}

function Page() {
    const [guests, setGuests] = React.useState(null);

    React.useEffect(() => {
        DB.collection('guests').get()
            .then(res => res.docs.map(d => ({ ...d.data(), id: d.id })))
            .then(docData => setGuests(docData))
            .catch((err) => console.error(err))
    }, []);

    const onDelete = async (guest) => {
        await DB.collection('guests').doc(guest.id).delete();
        location.reload();
    }

    return (
        <div className="container mx-auto">
            <Header links={[{ label: 'Guests', href: '/guests' }]}></Header>
            <Link href="/guests/add"><a className="btn btn-primary mt-5">Add Guest</a></Link>
            <table className="table w-full table-compact mt-4">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guests && guests.map((guest, i) => {
                            return <tr key={i}>
                                <th>{guest.first_name || '-'}</th>
                                <th>{guest.last_name || '-'}</th>
                                <th>{guest.address || '-'}</th>
                                <th className="text-gray-300">{guest.id || '-'}</th>
                                <th><LinkButton id={guest.id}></LinkButton></th>
                                <th><DeleteButton onClick={() => onDelete(guest)}></DeleteButton></th>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

function LinkButton({ id }) {
    return <a title="RSVP Link" href={"/rsvp?id=" + id} className="btn btn-circle btn-xs md:btn-sm lg:btn-md xl:btn-lg">
        <svg id="i-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <path d="M18 8 C18 8 24 2 27 5 30 8 29 12 24 16 19 20 16 21 14 17 M14 24 C14 24 8 30 5 27 2 24 3 20 8 16 13 12 16 11 18 15" />
        </svg>
    </a>
}

function DeleteButton({ onClick }) {
    return <button onClick={onClick} className="btn btn-circle btn-xs md:btn-sm lg:btn-md xl:btn-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current md:w-6 md:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
}
