import {signInWithGoogle} from "../../base";
import './Login.css'

function Login(props) {
    return (
        <div className="Login">
            <button className="button" onClick={signInWithGoogle}>Войти при помощи Google</button>
        </div>
    );
}

export default Login;