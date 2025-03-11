import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, isLoading, error} = useSignup();
    const navigate = useNavigate();
    const handleSignup = async () => {
        await signup(username, email, password)
    }
    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/auth/googleLogin", "_self")
    }
    return (
            <>
            <div className={styles.logo}></div>
            <div className={styles.container}>
                <div className={styles.header}>Sign up to KnowYourKOL</div>
                <div className={styles.dividerHorizontal}></div>
                <br />
                <input className={styles.input} type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                <input className={styles.input} type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <input className={styles.input} type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <div className={styles.buttonContainer}>
                    <button className={styles.buttonFade} onClick={() => navigate('/login')}>Login</button>
                    <button className={styles.button} onClick={handleSignup}>Sign Up</button>
                </div>
                <div className={styles.error}>{error}</div>
                <div className={styles.text}>Or</div>
                <br/>
                <button className={styles.googleButton} onClick={handleGoogleLogin}>
                    <div className={styles.googleText}>Sign in with Google</div>
                    <div className={styles.googleLogo}></div>
                </button>
            </div>
            </>
    )
}
export default SignUp