import React from 'react';
import { DB } from '../../../utils/init-firebase';
import { Family } from 'shared/guest.model';
import { Invitation } from 'shared/invitation';

export default function Page() {
  const [guests, setGuests] = React.useState<Family[]>(null);

  React.useEffect(() => {
    DB.collection('families').get()
      .then(res => res.docs.map(d => ({ ...d.data(), id: d.id } as Family)))
      .then(dataArr => setGuests(dataArr))
      .catch((err) => console.error(err))
  }, []);

  return (
    <div className="relative">
      {guests && guests.map((guest) => {
        return <div key={guest.id} className="relative page-break-avoid inline-block">
          <Invitation
            id={guest.id}
            family_name={guest.family_name}
            customGreeting={guest.custom_greeting}
            extraDetails={guest.extra_details}
          />
        </div>;
      })}
    </div>
  )
}
