import styles from './Login.module.css'
import logo from '../assets/logo.png'
const Login = () =>{

    return(
        <div className={styles.container}>
            <img className={styles.img} src={logo}/>
            <div className={styles.title}>Packedify</div>
            <a
                className={styles['App-link']}
                href="https://packedify.herokuapp.com/login"
            >
                Login with Spotify
            </a>
        </div>
    )
}
export default Login;