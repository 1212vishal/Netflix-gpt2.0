import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.user);

  const handleOnClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened
        navigate("/error");
      });

    navigate("/");
  };

  return (
    <div className="absolute bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img
        className="w-40"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />

      {currentUser && (
        <div className="flex">
          <img
            className="w-12 h-10 m-2"
            src="https://th.bing.com/th/id/OIP.G582ogxZkx3sSitNbIPlMQHaF0?rs=1&pid=ImgDetMain"
            alt="Admin"
          ></img>
          <h1
            onClick={handleOnClick}
            className="font-bold text-white bg-red-800 w-13 h-7 my-3 mx-1 rounded-lg hover:cursor-pointer"
          >
            Sign Out
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
