import React from 'react';
import { getCollection } from '../../../utils/firebase-wrapper';
import { Family } from 'shared/guest.model';
import { Invitation } from 'shared/invitation';

export default function Page() {
  const [guests, setGuests] = React.useState<Family[]>(null);

  React.useEffect(() => {
    getCollection('families')
      .then(res => res.docs.map(d => ({ ...d.data(), id: d.id } as Family)))
      .then(dataArr => setGuests(dataArr))
      .catch((err) => console.error(err))
  }, []);

  return (
    <div className="relative">
      {guests && guests.map((guest) => {
        return <Invitation
            key={guest.id}
            id={guest.id}
            family_name={guest.family_name}
            customGreeting={guest.custom_greeting}
            extraDetails={guest.extra_details}
          />
      })}
    </div>
  )
}
