import React from 'react';
import Link from 'next/link';
import { DB } from '../../utils/init-firebase';
import { Header } from '../../shared/header';
import { Family, GuestDoc, GuestResponseDoc } from 'shared/guest.model';

type GuestResponseMap = {
    [guestId: string]: boolean;
}

export default function Page() {
    const [guests, setGuests] = React.useState<Family[]>(null);
    const [isGuestComingMap, setIsGuestComingMap] = React.useState<GuestResponseMap>({});

    React.useEffect(() => {
        DB.collection('families').get()
            .then(res => res.docs.map(d => ({ ...d.data(), id: d.id } as Family)))
            .then(dataArr => setGuests(dataArr))
            .catch((err) => console.error(err))
    }, []);

    React.useEffect(() => {
        if (!guests) {
            return;
        }
        async function FetchResponses() {
            const res = await DB.collection('guest-responses').get()
            const responses = res.docs.map(d => ({ ...d.data(), id: d.id } as GuestResponseDoc));
            const responsesMap = responses.reduce((a, c) => {
                a[c.id] = !!c.is_coming;
                return a;
            }, {} as GuestResponseMap);
            setIsGuestComingMap(responsesMap);
            console.log({ responsesMap });
        }
        FetchResponses().catch((err) => console.error(err));
    }, [guests]);

    return (
        <>
            <Header links={[{ label: 'Guests', href: '/guests' }]}></Header>
            <div className="container mx-auto">
                <div className="px-3 overflow-x-auto">
                    <Link href="/guests/add"><a className="btn btn-primary mt-5">Add Family</a></Link>
                    <table className="table w-full table-compact mt-4">
                        <thead>
                            <tr>
                                <th>Family Name</th>
                                <th>Guests</th>
                                <th>Address</th>
                                <th>Responded?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                guests && guests.map((family, i) => {
                                    return <tr key={i}>
                                        <th>
                                            <p className="font-bold text-xl">{family.family_name || '-'}</p>
                                            <p className="text-gray-300 text-xs italic">{family.id}</p>
                                        </th>
                                        <th>
                                            <ul className="list-disc list-inside">
                                                {family.guests && family.guests.map((guest, i) => {
                                                    return <li key={i}>{guest.first_name} {guest.last_name}</li>
                                                })}
                                            </ul>
                                        </th>
                                        {/* <th><ResponseIcon isGoing={(isfamilyComingMap[family.id])} /></th> */}
                                        <th><LinkButton id={family.id} /></th>
                                        <th><EditButton id={family.id} /></th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function ToolTip({ label, children }) {
    return <div data-tip={label} className="tooltip">{children}</div>
}

function SvgBase({ label, children }) {
    return <ToolTip label={label}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            {children}
        </svg>
    </ToolTip>;
}

function ResponseIcon({ isGoing }) {
    const noResponseYet = isGoing == null;
    if (noResponseYet) {
        return <SvgBase label="Hasn't responded yet"><path d="M2 16 L30 16" /></SvgBase>;
    }
    if (isGoing) {
        return <SvgBase label="Responded 'going'"><path d="M2 20 L12 28 30 4" /></SvgBase>;
    } else {
        return <SvgBase label="Responded 'cant make it'"><path d="M2 30 L30 2 M30 30 L2 2" /></SvgBase>;
    }
}

function LinkButton({ id }) {
    return <ToolTip label="View Guest Link"><Link href={"/rsvp?id=" + id}><a className="btn btn-circle btn-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            <circle cx="17" cy="15" r="1" />
            <circle cx="16" cy="16" r="6" />
            <path d="M2 16 C2 16 7 6 16 6 25 6 30 16 30 16 30 16 25 26 16 26 7 26 2 16 2 16 Z" />
        </svg>
    </a></Link></ToolTip>;
}

function EditButton({ id }) {
    return <ToolTip label="Edit Guest"><Link href={"/guests/edit?id=" + id}><a className="btn btn-circle btn-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" width="24" height="24" className="inline-block w-4 h-4 stroke-current md:w-6 md:h-6">
            <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
        </svg>
    </a></Link></ToolTip>;
}
