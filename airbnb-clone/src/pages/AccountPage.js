import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (subpage === undefined) {
    subpage = "profile";
  }
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && user && ( // Check if user is defined
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name || 'Unknown'} ({user.email || 'Unknown'}) <br />
          <button onClick={logout} className="primary max-w-sm mt-2 ">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
