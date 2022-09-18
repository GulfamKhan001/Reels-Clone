import { Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { margin } from "@mui/system";

function DisplayComments({ postData }) {
  const [allComments, setAllComments] = useState(null);
  useEffect(() => {
    abs();
  }, [postData]);
  function abs() {
    let tempArray = [];
    postData.comments.map(async (commentId) => {
      const docSnap = await getDoc(doc(db, "comments", commentId));
      tempArray.push(docSnap.data());
      setAllComments(tempArray);
    });
  }
  return (
    <div>
      {allComments == null ? (
        <CircularProgress color="success" />
      ) : (
        <>
          {allComments.map((commentObj) => {
            return (
              <div className="comment" >
                <div className="user" style={{display: "flex" ,alignItems: "center"}}>
                  <Avatar src={commentObj.userDP} />&nbsp;&nbsp;
                  <p>
                    <span style={{ fontWeight: "bold" }}>{commentObj.userName}</span>
                  </p>
                </div>
                <div>
                <p className="user-comment" style={{ border: "1px solid black", borderRadius: "5px" ,margin: "3px"}}>
                    {commentObj.text}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default DisplayComments;