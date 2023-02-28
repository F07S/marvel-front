import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Header = ({ handleToken }) => {
  const token = Cookies.get("token");
  return (
    <header>
      <img
        src="https://i.pinimg.com/564x/d6/ed/7f/d6ed7f9bc4b2fcb30736cdb98c97a0b5.jpg"
        alt=""
      />
      <nav className="navigation">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <Link to="/comics">
          <button>COMICS</button>
        </Link>

        {token && (
          <Link to="/favourites">
            <button>FAVOURITES</button>
          </Link>
        )}

        {token ? (
          <button
            className="deconnect"
            onClick={() => {
              handleToken(null);
            }}
          >
            LOG OUT
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>SIGN UP</button>
            </Link>
            <Link to="/login">
              <button>LOG IN</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
