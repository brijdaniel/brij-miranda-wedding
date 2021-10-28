import React from 'react';
import { loginWithEmailPass } from '../utils/firebase-wrapper';
import { TextField, PasswordField } from './fields';
import { LoadingScreen } from './loading-screen';

export function LoginForm() {
    const [email, setEmail] = React.useState<string>();
    const [password, setPassword] = React.useState<string>();
    const [loading, setLoading] = React.useState<boolean>();

    const valid = email && password;

    const onSubmit = async () => {
        if (!valid) {
            return;
        }
        try {
            setLoading(true);
            await loginWithEmailPass(email, password)
            location.reload();
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (<>
        {loading && <div className="absolute inset-0 bg-opacity-30"><LoadingScreen label="Logging in" /></div>}
        <label htmlFor="my-modal-2" className="btn btn-primary modal-button">Login Form</label>
        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <TextField label="Email" onChange={setEmail} />
                <PasswordField label="Password" onChange={setPassword} />
                <div className="modal-action">
                    {valid ?
                        <label htmlFor="my-modal-2" onClick={onSubmit} className={"btn btn-primary"}>Login</label>
                        : <button className="btn btn-primary" disabled={true}>Login</button>
                    }
                    <label htmlFor="my-modal-2" className="btn">Cancel</label>
                </div>
            </div>
        </div>
    </>);
}
