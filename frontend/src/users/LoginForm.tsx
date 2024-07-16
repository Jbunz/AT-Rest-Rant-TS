import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUser } from "../contexts/CurrentUser";

interface Credentials {
    email: string;
    password: string;
}

function LoginForm() {
    const history = useHistory();
    const context = useContext(CurrentUser);

    if (!context) {
        throw new Error("useContext must be used within a CurrentUserProvider");
    }

    const { setCurrentUser } = context;

    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/authentication/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            console.log(data); 

            setCurrentUser(data.user);

            history.push("/dashboard");
        } catch (error) {
            console.error("Error logging in:", error);
            setErrorMessage("Failed to log in. Please check your credentials.");
        }
    }

    return (
        <main>
            <h1>Login</h1>
            {errorMessage !== null ? (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            ) : null}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            required
                            value={credentials.email}
                            onChange={(e) =>
                                setCredentials({ ...credentials, email: e.target.value })
                            }
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="col-sm-6 form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            className="form-control"
                            id="password"
                            name="password"
                        />
                    </div>
                </div>
                <input className="btn btn-primary" type="submit" value="Login" />
            </form>
        </main>
    );
}

export default LoginForm;
