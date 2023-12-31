import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../components/AccountNavigation";

export default function AccountPage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "loading....";
  }
  if (ready && !user && !ready) {
    return <Navigate to="/login" />;
  }

  async function logout() {
    try {
      await axios.post("/api/user/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      alert("some thing went wrong");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNavigation />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
