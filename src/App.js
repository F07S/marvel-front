// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages CSS
import "./App.css";
import "./pages/home/Home.css";
import "./pages/character/Character.css";
import "./pages/comics/Comics.css";
import "./pages/favourites/Favourites.css";
import "./pages/signup/Signup.css";
import "./pages/login/Login.css";

// Component CSS
// import "./components/background/Background.css";
import "./components/header/Header.css";

// Usestate
import { useState } from "react";

//Cookies
import Cookies from "js-cookie";

// Pages
import Home from "./pages/home/Home";
import Character from "./pages/character/Character";
import Comics from "./pages/comics/Comics";
import Favourites from "./pages/favourites/Favourites";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

// Components
// import Background from "./components/background/Background";
import Header from "./components/header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
        <Route path="/comics" element={<Comics />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
