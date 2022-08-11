import React,{useContext} from 'react'
import TextField from "@mui/material/TextField";
import Image from "next/image"
import logo from '../../assets/Instagram.jpg'
import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import bg5 from '../../assets/bg5.jpg'
import {AuthContext} from '../../context/auth'

function index() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { login } = useContext(AuthContext);

  let handleClick = async() => {
    try {
      console.log(email);
      console.log(password);
      setLoading(true);
      setError('');
      await login(email, password);
      console.log("logged in");
    }
    catch (err) {
      console.log("error ", JSON.stringify(err));
      let errr = err.code.split("/");
      
      setError(errr[1]);
      // use settimeout to remove error after 2sec
      setTimeout(() => {
        setError('');
      }, 6000);
    }
    setLoading(false);
  }
  return (
    <div className="login-container">
      <div className="insta-mob-bg">
        <div className="carousel">
          <Carousel
            autoPlay
            interval={2000}
            infiniteLoop
            showArrows={false}
            showThumbs= {false}
            showIndicators={false}
            stopOnHover
            showStatus={false}
            // thumbWidth={5}
          >
            <Image src={bg1} width="211" height="375"/>
            <Image src={bg2} width="211" height="375"/>
            <Image src={bg3} width="211" height="375"/>
            <Image src={bg4} width="211" height="375"/>
            <Image src={bg5} width="211" height="375"/>
          </Carousel>
        </div>
      </div>
      <div>
        <div className="login-card">
          <Image src={logo} />
          <TextField
            id="outlined-basic"
            size="small"
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            value= {email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            size="small"
            label="Password"
            variant="outlined"
            fullWidth
            margin="dense"
            type="password"
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
          />
          { error != "" && <div style={{color : "red"}}>{error}</div>}
          
          <div style={{ color: "blue", marginTop: "0.5rem" }}>
            Forget Password
          </div>

          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            component="label"
            fullWidth
            onClick={handleClick}
          >
            Log in
          </Button>
        </div>
        <div className="bottom-card">
          Don't Have an account ?{" "}
          <span style={{ color: "blueviolet" }}>Signup</span>
        </div>
      </div>
    </div>
  );
}

export default index;