import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, userIdAtom } from "../recoil/recoil";
import { Link } from "react-router-dom";

function Header() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const userId = useRecoilValue(userIdAtom);

  const removeId = () => {
    setIsLogin(false);
    localStorage.removeItem("id");
  };

  return (
    <header>
      {isLogin ? (
        <div>
          Hi I'm
          <div className="x-btn">{userId}</div>
          <Link to="/" onClick={removeId}>
            Logout
          </Link>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
}

export default Header;
