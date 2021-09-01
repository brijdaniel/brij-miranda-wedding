import React from 'react';
import { APP } from '../utils/init-firebase';
import { TextField, PasswordField } from './fields';

export function LoginForm() {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const valid = email && password;

    const onSubmit = () => {
        if (!valid) {
            return;
        }
        APP.auth().signInWithEmailAndPassword(email, password)
            .then(() => location.reload())
            .then((err) => console.error(err));
    }

    return (<>
        <label htmlFor="my-modal-2" className="btn btn-primary modal-button">Login Form</label>
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <TextField label="Email" onChange={setEmail} />
                <PasswordField label="Password" onChange={setPassword} />
                <div className="modal-action">
                    {valid ?
                        <label htmlFor="my-modal-2" onClick={onSubmit} className={"btn btn-primary"}>Login</label>
                        : <button className="btn btn-primary" disabled="disabled">Login</button> 
                    }
                    <label htmlFor="my-modal-2" className="btn">Cancel</label>
                </div>
            </div>
        </div>
    </>);
}
