import React, {useState} from "react";

function SignIn(){
    const [hover, setHover] = useState(false);

    const styles = {
        signinPage: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#060b26",
            border: "none",
            margin: "0",
        },
        signin: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "hsl(0, 0.00%, 82.40%)",
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
            background: "hsl(0, 0.00%, 60.80%)",
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
            fontSize: "1.1rem",
        },
    };
    return (
        <div className="signinPage" style={styles.signinPage}>
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
                        <p style={styles.p}>Don't have an account? <a style={{color: "hsla(250, 100%, 50%, 0.51)"}} href="/SignUp">Sign UP</a></p>
                    </form>
                </div>
            </div> 
        </div>
    );
}
export default SignIn;
