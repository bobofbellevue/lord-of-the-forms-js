import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from "react";

export const FunctionalApp = () => {
  const [user, setUser] = useState({
    name: "",
    clan: "",
    abode: "",
    palantir: ["", "", "", ""],
    email: "",
  });
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation {...user} />
      <FunctionalForm {...user} setUser={setUser} />
    </>
  );
};
