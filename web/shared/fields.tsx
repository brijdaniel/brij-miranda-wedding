import React from 'react';

function useDefaultValueRef<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(defaultValue) {
    const ref = React.useRef<T>();
    React.useEffect(() => defaultValue != null && ref?.current && (ref.current.value = defaultValue), []);
    return ref;
}

type TextProps = {
    defaultValue?: string, 
    label: string, 
    onChange: (val: string) => any
};

export function TextField({ defaultValue, label, onChange }: TextProps) {
    const ref = useDefaultValueRef<HTMLInputElement>(defaultValue);
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input ref={ref} onChange={e => onChange(e.currentTarget.value)} type="text" placeholder={label} className="input input-bordered" />
    </div>;
}

export function PasswordField({ label, onChange }: TextProps) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input onChange={e => onChange(e.currentTarget.value)} type="password" placeholder={label} className="input input-bordered" />
    </div>;
}

export function TextAreaField({ defaultValue, label, onChange }: TextProps) {
    const ref = useDefaultValueRef<HTMLTextAreaElement>(defaultValue);
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <textarea ref={ref} rows={4} onChange={e => onChange(e.currentTarget.value)} placeholder={label} className="textarea textarea-bordered" />
    </div>;
}

export function CheckboxField({ defaultValue, label, onChange }) {
    const ref = useDefaultValueRef<HTMLInputElement>(defaultValue);
    return <div className="p-6 card bordered">
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text">{label}</span>
                <input ref={ref} type="checkbox" onChange={e => onChange(e.currentTarget.value)} className="checkbox" />
            </label>
        </div>
    </div>;
}

interface ButtonToggleFieldProps {
    defaultValue?: string, 
    label: any, 
    options: ButtonToggleOption[], 
    onChange: (val: string) => any
}

interface ButtonToggleOption {
    value: string;
    label: string;
    subLabel: string;
}

export function ButtonToggleField({ defaultValue, label, options, onChange }: ButtonToggleFieldProps) {
    React.useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue);
        }
    }, [defaultValue]);
    const [selected, setSelected] = React.useState<string>();
    React.useEffect(() => onChange(selected), [selected]);

    return <div className="form-control w-full">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <div className="btn-group w-full bg-white">
            {options.map((o, i) => (<button
                key={i}
                className={('w-1/' + options.length) + ' btn btn-outline btn-lg ' + (o.value === selected ? 'btn-active' : '')}
                onClick={() => setSelected(o.value)} 
                value={o.value}
            >
                <div className="flex flex-col items-center">
                    <p className="">{o.label}</p>
                    <p className="text-xs -mx-6">{o.subLabel}</p>
                </div>
            </button>))}
        </div>
    </div>;
}

type SelectProps = {
    defaultValue?: string, 
    label: string, 
    onChange: (val: string) => any,
    options: {value: string, label: string}[];
};

export function SelectField({ label, options, onChange, defaultValue }: SelectProps) {
    const ref = useDefaultValueRef<HTMLSelectElement>(defaultValue);

    return <div className="form-control w-full">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <select ref={ref} onChange={e => onChange(e.currentTarget.value)} className="select select-bordered select-lg w-full">
            {options.map((o, i) => (<option key={i} value={o.value}>{o.label}</option>))}
        </select>
    </div>;
}
