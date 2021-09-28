import React from 'react';
import { TextField, TextAreaField } from './fields';
import { Family, FamilyGuestDoc } from 'shared/guest.model';

interface FamilyFormProps {
  initialValue?: Family;
  onSubmit: (value: Family) => any;
  onCancel?: () => any;
  onDelete?: () => any;
}

export function FamilyForm(props: FamilyFormProps) {
  const initialValue = props.initialValue;

  const [familyName, setFamilyName] = React.useState<string>(initialValue?.family_name);
  const [address, setAddress] = React.useState<string>(initialValue?.address);
  const [guests, setGuests] = React.useState<FamilyGuestDoc[]>(initialValue?.guests);

  const onSubmit = () => {
    const family: Family = {
      family_name: familyName,
      address: address,
      guests: guests
    }
    console.log('form submitting', { family });
    props.onSubmit(family);
  };

  const onDelete = () => {
    props.onDelete();
  }

  const isFormInvalid = !familyName || !guests || guests.length < 1 || !address;

  return (
    <>
      <TextField defaultValue={initialValue?.family_name} label="Family Name" onChange={setFamilyName} />
      <TextAreaField defaultValue={initialValue?.address} label="Address" onChange={setAddress} />

      <Guests defaultValue={initialValue?.guests} onChange={setGuests} />

      <div className="flex gap-2 items-start justify-between mt-5">
        <div className="flex gap-2 items-center">
          <button disabled={isFormInvalid} type="button" onClick={onSubmit} className="btn btn-primary">Save Family</button>
          <button type="button" onClick={() => props?.onCancel()} className="btn">Cancel</button>
        </div>
        <button disabled={isFormInvalid} type="button" onClick={onDelete} className="btn btn-error mt-20">Delete Family</button>
      </div>
    </>
  )
}

function RandId() {
  return Math.random().toString(32).slice(2, 10);
}

interface GuestsProps {
  defaultValue: FamilyGuestDoc[];
  onChange: (res: FamilyGuestDoc[]) => any
}

function Guests(props: GuestsProps) {
  const [guests, setGuests] = React.useState<FamilyGuestDoc[]>(props?.defaultValue);

  React.useEffect(() => {
    props.onChange(guests);
  }, [guests]);

  React.useEffect(() => {
    if (Array.isArray(props.defaultValue)) {
      props.defaultValue.map(obj => {
        if (!obj.id) {
          obj.id = RandId()
        }
      });
      setGuests(props.defaultValue);
    } else {
      setGuests([]);
    }
  }, [props.defaultValue]);

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
        defaultValue={guest}
        onChange={(res) => guestChanged(res, index)}
        onDelete={() => onClickRemove(index)}
      />
    )}
  </div>
}

interface GuestProps {
  id: string;
  defaultValue: FamilyGuestDoc;
  onChange: (res: FamilyGuestDoc) => any;
  onDelete: () => any;
}

function Guest(props: GuestProps) {
  const [firstName, setFirstName] = React.useState<string>(props?.defaultValue?.first_name);
  const [lastName, setLastName] = React.useState<string>(props?.defaultValue?.last_name);

  React.useEffect(() => {
    props.onChange({
      id: props.id,
      first_name: firstName || '',
      last_name: lastName || ''
    });
  }, [firstName, lastName]);

  return <div className="grid grid-cols-2 gap-2">
    <TextField defaultValue={props.defaultValue?.first_name} label="First Name" onChange={setFirstName} />
    <div className="flex items-end gap-2 flex-grow">
      <div className="flex-grow"><TextField defaultValue={props.defaultValue?.last_name} label="Last Name" onChange={setLastName} /></div>
      <button className="btn" onClick={props.onDelete}>X</button>
    </div>
  </div>
}
