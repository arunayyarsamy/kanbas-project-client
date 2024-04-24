import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    const save = async () => {
        await client.updateUser(profile);
    };
    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };
    const formatDate = (date: any) => {
      if (date === "") {
        return "";
      }
      return new Date(date).toISOString().split("T")[0];
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
      <div>
        <h1>Profile</h1>
        {profile && (
          <div className="d-flex flex-column gap-3 w-50">
            <input
              className=""
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <input
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              value={formatDate(profile.dob)}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <select
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>
        )}
        <br />
        <div className="d-flex flex-column gap-3 w-25 ">
          <button onClick={save} className="btn btn-primary ">
            Save
          </button>
          <button onClick={signout} className="btn btn-warning ">
            Signout
          </button>
          <Link to="/Kanbas/Account/Admin/Users" className="btn btn-info">
            Users
          </Link>
        </div>
      </div>
    );
}