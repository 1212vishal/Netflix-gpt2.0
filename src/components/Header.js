import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.user);

  const handleOnClick = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened
        navigate("/error");
      });

    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img className="w-40" src={NETFLIX_LOGO} alt="Logo" />

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
