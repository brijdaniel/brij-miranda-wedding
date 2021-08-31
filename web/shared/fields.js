export function TextField(props) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{props.label}</span>
        </label>
        <input onChange={e => props.onChange(e.currentTarget.value)} type="text" placeholder={props.label} className="input input-bordered" />
    </div>;
}

export function TextAreaField(props) {
    return <div className="form-control">
        <label className="label">
            <span className="label-text">{props.label}</span>
        </label>
        <textarea rows={4} onChange={e => props.onChange(e.currentTarget.value)} type="text" placeholder={props.label} className="textarea textarea-bordered" />
    </div>;
}
