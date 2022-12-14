import { Button, IconButton, LinearProgress } from '@mui/material';
import React, { useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import Alert from "@mui/material/Alert";
import { v4 as uuidv4 } from "uuid";
import { addDoc, arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../firebase";
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import Error from './Error';
import Progress from './Progress';

function Upload({ userData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const fileLimit = 50;
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file == null) {
      setError("File not selected");
      setTimeout(() => { setError('') }, 2500);
      return;
    }
    if ((file.size / (1024 * 1024)) > fileLimit) {
      setError(`File too Large, Try uploading a file less than ${fileLimit} MB`);
      setTimeout(() => {
        setError("");
      }, 2500);
      return;
    }
    let uid = uuidv4();
    setLoading(true);
    // Upload file and metadata to the object 'images/mountains.jpg'
    // userid/post/uid
    const storageRef = ref(storage, `${userData.uid}/post/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
        console.log("Upload is " + prog + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
        setError(error);
        setTimeout(() => { setError('') }, 2000);
        return;
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          let post = {
            likes: [],
            comments: [],
            postId: uid,
            postURL: downloadURL,
            profileName: userData.fullName,
            profilePhotoURL: userData.downloadURL,
            userId: userData.uid,
            timestamp: serverTimestamp(),
          }

          console.log("post", post);
          await setDoc(doc(db, "posts", uid), post);
          console.log("posts added to post collection");
          // db,collection name, document name
          // await setDoc(doc(db, "users", userInfo.user.uid), userData);
          // console.log("doc added to db");
          //update in users, posts ka arr 
          await updateDoc(doc(db, "users", userData.uid), {
            posts: arrayUnion(uid),
          });
          console.log("posts array added to user doc");
          setLoading(false);

        });
      }
    );
    console.log("user reel uploaded up");
    

  }
  return (
    <div className="upload-btn">
      {error != '' ?
        // <Alert severity="error">{error}</Alert>
        <Error error={error}/>
        :
        <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="video/*" type="file" onChange={handleChange}/>
              <AddIcon fontSize="large" className="nav-icons" />
            </IconButton>
      }
      {loading &&
        <Progress progress={progress}/>
      }
    </div>
  );
}

export default Upload;