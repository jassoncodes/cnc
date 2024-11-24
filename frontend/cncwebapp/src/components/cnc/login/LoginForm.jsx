import { useState } from "react"


export const LoginForm = ({ onSubmit }) =>
{
    const [userValue, setUserValue] = useState("");
    const [passValue, setPassValue] = useState("");

    const handleUserChange = (e) => setUserValue(e.target.value);
    const handlePassChange = (e) => setPassValue(e.target.value);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        onSubmit(userValue, passValue);
    }

    return (
        <div className="loginForm">
            <form className="loginForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username-input"
                    placeholder="Username"
                    value={userValue}
                    onChange={handleUserChange}
                />

                <input
                    type="password"
                    id="pass-input"
                    placeholder="Password"
                    onChange={handlePassChange}
                />
                <button
                    type="submit"
                    id="login-button"
                    disabled={!userValue || !passValue}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}
