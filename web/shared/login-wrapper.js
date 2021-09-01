import React from 'react';
import { GetLoggedInUser } from '../utils/init-firebase';
import { LoginForm } from "./login-form";

export function LoginWrapper(props) {
    const [status, setStatus] = React.useState('loading');

    React.useEffect(() => {
        GetLoggedInUser()
            .then((u) => setStatus(!!u ? 'logged-in' : 'not logged in!'))
            .catch(err => setStatus(err.toString()) && console.error(err))
    }, []);

    if (status === 'loading') {
        return <h1>Loading</h1>
    }

    if (status === 'logged-in') {
        return <>
            {props.children}
        </>
    }

    return <h1>Error: {status} <LoginForm /></h1>
}