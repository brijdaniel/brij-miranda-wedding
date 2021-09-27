import React from "react"
import { ButtonToggleField, SelectField, TextAreaField } from "./fields"
import { Family, FamilyGuestDoc, FamilyResponseDoc, GuestResponseDoc } from "./guest.model"

interface RsvpFormProps {
  familyDoc: Family;
  onSubmit: (result: FamilyResponseDoc) => any
}

export function RsvpForm(props: RsvpFormProps) {
  const { onSubmit, familyDoc } = props
  const [responses, setResponses] = React.useState<GuestResponseDoc[]>([]);
  const [isFormValid, setIsFormValid] = React.useState<boolean>();

  React.useEffect(() => {
    const guestCount = familyDoc.guests?.length;
    const isValid = guestCount === responses.length;
    setIsFormValid(isValid);
    console.log({isValid, responses, guests: familyDoc.guests})
  }, [responses, familyDoc]);

  const onClickedSubmit = () => {
    const resultObj: FamilyResponseDoc = {
      responses: responses,
      id: familyDoc.id,
    };
    onSubmit(resultObj);
  }

  const onChangedGuestResponse = (guestId: string, newResponse: GuestResponseDoc) => {
    const currentResponses = [...responses];
    const index = currentResponses.findIndex(r => r.id === guestId)
    if (index >= 0) {
      currentResponses[index] = newResponse;
    } else {
      currentResponses.push(newResponse);
    }
    setResponses(currentResponses);
  }

  const allNotComing = isFormValid && responses.every(r => !r.is_coming);

  return <div data-theme="mytheme">
    <div className="flex flex-col gap-2">
      {
        familyDoc.guests.map((guest) => <RsvpGuestForm
          key={guest.id}
          guest={guest}
          onChange={(guestResponse) => onChangedGuestResponse(guest.id, guestResponse)}
        />)
      }
    </div>
    {allNotComing && <>
      <h2 className="mt-3">We're sorry to hear that, look forward to seeing you soon :)</h2>
    </>}
    <button disabled={!isFormValid} onClick={onClickedSubmit} className="my-3 btn btn-primary">Send Response</button>
  </div>
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

interface RsvpGuestFormProps {
  guest: FamilyGuestDoc;
  onChange: (value: GuestResponseDoc) => any;
}

function RsvpGuestForm({ guest, onChange }: RsvpGuestFormProps) {
  const [dietOption, setDietOption] = React.useState('none');
  const [extraDietInfo, setExtraDietOption] = React.useState('');
  const [areYouComingResult, setAreYouComingResult] = React.useState<string>();
  const [wouldYouLikeTransportResult, setWouldYouLikeTransportResult] = React.useState<string>('no');
  const [transportLocationResult, setTransportLocationResult] = React.useState('');

  const isComing = areYouComingResult === 'yes';
  const isDietNone = dietOption === 'none';
  const isTransportNone = wouldYouLikeTransportResult === 'no';
  const isTransportRequired = !isTransportNone;

  React.useEffect(() => {
    if (areYouComingResult == null) {
      return;
    }
    onChange({
      id: guest.id,
      is_coming: isComing,
      diet_option: dietOption,
      diet_extra_info: extraDietInfo,
      transport_required: isTransportRequired,
      transport_location: transportLocationResult,
      created_at: new Date().toISOString()
    });
  }, [dietOption, extraDietInfo, areYouComingResult, wouldYouLikeTransportResult, transportLocationResult]);

  const guestName = `${guest?.first_name} ${guest?.last_name}`;
  const buttonToggleLabel = <p>Is <span className="font-bold">{guestName}</span> coming?</p>;

  return <div className="card shadow p-3 bg-white">
    <ButtonToggleField label={buttonToggleLabel} options={areYouComingOptions} onChange={setAreYouComingResult} />
    {isComing && <>
      <SelectField label="Dietary Requirements?" options={dietaryOptions} onChange={setDietOption} />
      {!isDietNone && <TextAreaField label="Any extra dietary information?" onChange={setExtraDietOption} />}
      <SelectField initialValue="no" label="Would you be interested in transport?" options={wouldYouLikeTransportOptions} onChange={setWouldYouLikeTransportResult} />
      {!isTransportNone && <SelectField label="Where from?" options={transportLocationOptions} onChange={setTransportLocationResult} />}
    </>}
  </div>
}
