import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  //Login input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // onChange Input Handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/login",

        {
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

      if ((error.response.data.message = "Unauthorized")) {
        setErrorMessage(
          "The e-mail and/or password are not valid. Please try again."
        );
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <div className="login-container">
        <div className="login-box">
          <h1>LOG IN</h1>
          <input
            type="email"
            placeholder="Adresse email"
            className="input-tab"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input-tab"
            onChange={handlePasswordChange}
            value={password}
          />
          <button>Log in</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <span
            className="signup-here"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Not a member yet ? Sign up here!
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
