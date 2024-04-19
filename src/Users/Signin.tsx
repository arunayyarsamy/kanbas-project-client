import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h1>Signin</h1>
            <br />
            <div className="d-flex flex-column gap-3 w-25">
                <input className="input-group mb-3" value={credentials.username} onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })} />
                <input className="input-group" value={credentials.password} onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })} />
                <button className="btn btn-primary " onClick={signin}> Signin </button>
                <button className="btn btn-warning " onClick={
                    () => navigate("/Kanbas/Account/Signup")
                }> Signup </button>
            </div>
        </div>
    );
}