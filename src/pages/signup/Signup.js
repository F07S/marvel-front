import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  //Signup input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  //   const [data, setData] = useState();

  // onChange Input Handlers
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "http://localhost:4000/signup",

        {
          username: userName,
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;

      if (token) {
        // Cookies.set("token", token, { expires: 10 });
        handleToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage("This e-mail already exists.");
      }
      if ((error.response.data.message = "Missing parameters")) {
        setErrorMessage(
          "We are missing information to sign you up. Please fill in all the fields above."
        );
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="signup-container">
        <div className="signup-box">
          <h1>SIGN UP</h1>
          <input
            className="input-box"
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={handleUserNameChange}
            value={userName}
          />
          <input
            className="input-box"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            className="input-box"
            type="password"
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            value={password}
          />

          <button>Sign up</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <span
            className="connect-here"
            onClick={() => {
              navigate("/login");
            }}
          >
            If you already have an account, please click here to log in.
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;
