import React, {useState} from "react";
import SignInPic from "./signin.png"; 

function SignIn(){
    const [hover, setHover] = useState(false);

    const styles = {
        signinPage: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            background: "#060b26",
            border: "1px solid black",
            margin: "0",
        },
        signinPic: {
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            borderRadius: "10px",
        },
        image: {
            maxWidth: "100%",
            height: "100%",
            backgroundColor: "transparent",
        },
        signin: {
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "hsl(0, 0%, 46%)",
            padding: "20px",
            borderRadius: "10px",
            margin: "20px", 
        },
        signinheader: {
            textAlign: "center",
            marginBottom: "20px",
        },
        logo: {
            fontFamily: "Times New Roman",
            fontSize: "2rem",
            color: "#333",
            fontStyle: "italic",
        },
        signinform: {
            display: "flex",
            flexDirection: "column",
            width: "300px",
        },
        form: {
            display: "flex",
            flexDirection: "column",
        },
        input: {
            padding: "10px",
            marginBottom: "15px",
            border: "none",
            background: "hsl(0, 0.00%, 62.70%)",
            borderRadius: "10px",
        },
        button: {
            padding: "10px",
            background: hover ? "darkblue" : "hsla(250, 100%, 50%, 0.51)",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            borderRadius: "10px",
        },
        p: {
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.8rem",
        },
    };
    return (
        <div className="signinPage" style={styles.signinPage}>
            <div className="signinPic" style={styles.signinPic}>
                <img src={SignInPic} alt="cinema pictue"/>
            </div>
            <div className="signin" style={styles.signin}>
                <div style={styles.signinheader}>
                    <h1 style={styles.logo}>MOVIEZONE</h1>
                    <p>Enjoy the newest movies</p>
                </div>
                <div className="signinform" style={styles.signinform}>
                    <form style={styles.form} action="/home" >
                        <input style={styles.input} type="text" placeholder="example@mail.com" />
                        <input style={styles.input} type="password" placeholder="Password" />
                        <button style={styles.button}
                        onMouseOver={()=>setHover(true)}
                        onMouseOut={()=>setHover(false)}
                        type="submit">Sign In</button>
                        <p style={styles.p}>Don't have an account? <a href="/SignUp">Sign UP</a></p>
                    </form>
                </div>
            </div> 
        </div>
    );
}
export default SignIn;