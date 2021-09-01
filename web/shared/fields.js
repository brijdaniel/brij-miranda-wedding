import React from 'react';

export function TextField({ label, onChange }) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input onChange={e => onChange(e.currentTarget.value)} type="text" placeholder={label} className="input input-bordered" />
    </div>;
}

export function PasswordField({ label, onChange }) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input onChange={e => onChange(e.currentTarget.value)} type="password" placeholder={label} className="input input-bordered" />
    </div>;
}

export function TextAreaField({ label, onChange }) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <textarea rows={4} onChange={e => onChange(e.currentTarget.value)} type="text" placeholder={label} className="textarea textarea-bordered" />
    </div>;
}

export function CheckboxField({ label, onChange }) {
    return <div className="p-6 card bordered">
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text">{label}</span>
                <input type="checkbox" onChange={e => onChange(e.currentTarget.value)} className="checkbox" />
            </label>
        </div>
    </div>;
}

export function ButtonToggleField({ label, options, onChange }) {
    const [selected, setSelected] = React.useState();
    React.useEffect(() => onChange(selected), [selected]);

    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <div className="btn-group">
            {options.map((o, i) => (<button
                key={i}
                className={'btn btn-outline btn-lg ' + (o.value === selected ? 'btn-active' : '')}
                onClick={() => setSelected(o.value)} 
                value={o.value}
            >{o.label}</button>))}
        </div>
    </div>;
}

export function SelectField({ label, options, onChange }) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <select onChange={e => onChange(e.currentTarget.value)} className="select select-bordered select-lg w-full max-w-xs">
            {options.map((o, i) => (<option key={i} value={o.value}>{o.label}</option>))}
        </select>
    </div>;
}
