import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Components/Feed.css'
import '../Components/profile.css'
import AuthWrapper from '../context/auth';
function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>)
}

export default MyApp