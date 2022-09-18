import React, { useContext,useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import user from "../assets/avatar.png";
import { AuthContext } from "../context/auth";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
function Profile() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [postIds, setPostIds] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    console.log(user.uid);
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserData(doc.data());
      setPostIds(doc.data().posts);
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    let temp = [];
    postIds.map(pid => {
      const unsub = onSnapshot(doc(db, "posts", pid), (doc) => {
        temp.push(doc.data());
        console.log(temp);
        setUserPosts([...temp]);
        console.log("hello",temp);
      });
    })
  }, [postIds]);
  return (
    <div>
      <Navbar userData={userData}/>
      <div className="profile">
        <div className="profile-intro">
          <div className= "profile-Pic" style={{height:"8rem", width:"8rem",clipPath: "circle(50%)"}}>
            <Image layout="fill" src={userData.downloadURL} style={{height:"8rem", width:"8rem"}}/>
          </div>
          <div>
            <h1>{userData.fullName}</h1>
            <h1>Posts: {userData.posts?.length}</h1>
          </div>   
        </div>
        <hr />
        <div className="profile-posts">
        {userPosts.map(post => (
          <video src={post.postURL}></video>))}
        </div>
      </div>
    </div>
  );
}

export default Profile