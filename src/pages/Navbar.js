import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";
import fire from "../components/firebase";

const db = fire.firestore();

function Navbar() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [openMenu, isMenuOpen] = useState(false);
  const [resMenu, isResMenu] = useState(false);
  const [ProfileImage, setProfileImage] = useState();
  const [updateDOM, canUpdateDOM] = useState(false);

  useEffect(() => {
    const setUserProfileImage = async () => {
      if (isAuthenticated === true) {
        try {
          await db
            .collection("users")
            .doc(user.nickname)
            .get()
            .then((doc) => {
              setProfileImage(doc.data().picture);
              canUpdateDOM(true);
            });
        } catch (err) {
          console.log(err);
        }
      }
    };

    setUserProfileImage();
  });

  return (
    <nav className="w-full h-16 bg-white flex justify-between items-center">
      <div>
        <Link to="/">
          <h1 className="text-3xl font-nunito text-primary mx-5">
            DevConnect.
          </h1>
        </Link>
      </div>
      <ul className="w-1/3 h-full font-pop text-lg text-secondary-100 flex flex-row justify-around items-center mr:w-auto">
        <li className="cursor-pointer transform hover:scale-105  mr:hidden">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer transform hover:scale-105  mr:hidden">
          <Link to="/dashboard"> Dashboard</Link>
        </li>
        <li className="cursor-pointer transform hover:scale-105 mr:hidden">
          {isAuthenticated === true ? (
            <img
              alt="loginImage"
              className="w-10 mx-2 rounded-full"
              src={updateDOM ? ProfileImage : ""}
              onClick={() => {
                isMenuOpen(!openMenu);
              }}
            ></img>
          ) : (
            <button
              className="bg-primary text-white w-20 rounded transform hover:scale-105 transition"
              onClick={() => {
                loginWithRedirect();
              }}
            >
              Sign In
            </button>
          )}
        </li>
        <li className="hidden mr:block">
          {isAuthenticated === true ? (
            <img
              className="w-10 mx-2 rounded-full"
              src={updateDOM ? ProfileImage : ""}
              alt="ProfileImage"
              onClick={() => {
                isResMenu(!resMenu);
              }}
            ></img>
          ) : (
            <MenuIcon
              className="w-8 m-1 text-primary cursor-pointer"
              onClick={() => isResMenu(!resMenu)}
            />
          )}
        </li>
      </ul>

      {!openMenu ? null : (
        <div className="w-80 h-20 bg-gray-100 absolute inset-y-0 right-0 top-16 transition-all border-2 flex justify-center items-center">
          <ul className="w-full h-auto font-pop text-lg text-secondary-100 flex justify-center">
            <li>
              <button onClick={() => logout()}>Sign Out</button>
            </li>
          </ul>
        </div>
      )}

      {!resMenu ? null : (
        <div className="w-60 h-40 bg-gray-100 absolute inset-y-0 right-0 top-16 transition-all border-2 flex justify-center items-center">
          <ul className="w-full h-full font-pop text-lg text-secondary-100 flex flex-col justify-around items-center">
            <li className="cursor-pointer transform hover:scale-105">
              <Link to="/">Home</Link>
            </li>
            <li className="cursor-pointer transform hover:scale-105">
              <Link to="/dashboard"> Dashboard</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={() => logout()}>Sign Out</button>
              </li>
            ) : (
              <button
                className="bg-primary text-white w-20 rounded transform hover:scale-105 transition"
                onClick={() => {
                  loginWithRedirect();
                }}
              >
                Sign In
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
