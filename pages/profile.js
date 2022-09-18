import React from 'react'
import Profile from '../Components/Profile';
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
function Profiles() {
  const { user } = useContext(AuthContext);

  const Redirect = () => {
    const router = useRouter();
    router.push("/login");
    return null;
  };
    return (
      //this component will only be visible when we are logged in , so a protect route will be wrapped
      <>
      {user?.uid?
      <Profile/> :<Redirect/>}
      {/* <Profile/> */}
    </>
  )
}

export default Profiles