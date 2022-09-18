import React, { useEffect, useState } from 'react'
import Avatar from "@mui/material/Avatar";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material'
import DisplayComments from './DisplayComments'
import Comment from './Comment';
import * as ReactDOM from 'react-dom';

function Post({ postData, userData }) {
    // console.log("123456",postData);
    const [like, setLike] = useState(false);
    const [isMute, setIsMute] = useState(true);
    // heart red -> jab logged in user ne like kia hta h 
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        console.log("dialog opened");
        setOpen(true);
    };

    const handleClose = () => {
        console.log("dialog closed");
        setOpen(false);
    };
    useEffect(() => {
        if (postData.likes.includes(userData.uid)) {
            setLike(true);
        }
        else {
            setLike(false);
        }
    }, [postData])

    const handleLike = async () => {
        if (like) { //unlike
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayRemove(userData.uid),
            });
        }
        else { //like
            // likes["12345677iuyhtgfrd"]
            await updateDoc(doc(db, "posts", postData.postId), {
                likes: arrayUnion(userData.uid)
            })
        }
    }
    const handleMute = () => {
        if (isMute) {
            setIsMute(false);
        }
        else setIsMute(true);
    }

    const handleNextVideo = (e) => {
        //get the next video 
        let nextVideo = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if (nextVideo) {

            nextVideo.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className="post-container">
            <div className="avatar-container">
                <Avatar
                    alt="Remy Sharp"
                    src={postData.profilePhotoURL}
                    sx={{ margin: "0.5rem" }}
                />
                <p style={{ color: "black", fontWeight: "500" }}>{postData.profileName}</p>
            </div>
            <video muted={isMute}
                onClick={handleMute}
                onEnded={handleNextVideo}
                src={postData.postURL} />
            <div className="videos-info">
                <div className="post-like" >
                    <FavoriteBorderOutlinedIcon className="like" onClick={handleLike} style={like ? { color: "red" } : { color: "black" }} />
                    <MapsUgcOutlinedIcon className="comment"
                        onClick={handleClickOpen}
                        style={{ color: "black" }}
                    />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        maxWidth="sm"
                    >
                        <div className="modal-container">
                            <div className="video-modal">
                                <video autoPlay muted src={postData.postURL} />
                            </div>
                            <div className="comments-modal">
                                <Card className="card1" style={{ overflowY: 'scroll', scrollbarWidth: '0px' }}>
                                    <DisplayComments postData={postData} />
                                </Card>
                                <Card className="card2">
                                    <Typography
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {postData.likes.length == 0
                                            ? "Be the first one to like this post"
                                            : `Liked by ${postData.likes.length} users`}
                                    </Typography>
                                    {/* heart */}
                                    <div className="post-like2">
                                        <FavoriteBorderOutlinedIcon
                                            style={like ? { color: "red" } : { color: "black" }}
                                            onClick={handleLike}
                                        />
                                        <Comment userData={userData} postData={postData} />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div className="postlike-Count">
                    <p style={{ color: "black" }}>{postData.likes.length} likes</p>
                </div>
            </div>
        </div>
    );
}

export default Post