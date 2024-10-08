import React, { useRef, useState } from "react";
import Header from "./Header";
import { isValid } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [togglForm, settoggleForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const handleClick = () => {
    const message = isValid(email.current.value, password.current.value);

    if (message) return;
    if (!togglForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
          console.log(errorMessage);
        });
    }
  };

  const handleToggleForm = () => {
    settoggleForm(!togglForm);
  };

  return (
    <div>
      <Header />
      <img
        className="absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/04bef84d-51f6-401e-9b8e-4a521cbce3c5/null/IN-en-20240903-TRIFECTA-perspective_0d3aac9c-578f-4e3c-8aa8-bbf4a392269b_large.jpg"
        alt="Bglogo"
      />
      <form
        className=" absolute bg-black w-3/12 p-12 my-36 mx-auto right-0 left-0 bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold m-2 p-2 text-2xl text-white">
          {togglForm ? "Sign In" : "Sign Up"}
        </h1>
        {!togglForm && (
          <input
            ref={fullName}
            className="w-full p-2 m-3 bg-slate-700 text-white"
            type="text"
            placeholder="Full Name"
          ></input>
        )}
        {/* {!togglForm && (
          <input
            className="w-full p-2 m-3 bg-slate-700 text-white"
            type="text"
            placeholder="Email"
          ></input>
        )} */}

        <input
          ref={email}
          className="w-full p-2 m-3 bg-slate-700 text-white"
          type="text"
          placeholder="User Name"
        ></input>

        <input
          ref={password}
          className="w-full p-2 m-3 bg-gray-700 text-white"
          type="password"
          placeholder="Password"
        ></input>
        <button className="bg-red-600 p-2 m-3 w-full" onClick={handleClick}>
          {togglForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="m-2 p-2 font-bold text-red-800">{errorMessage}</p>
        <p
          className="font-bold text-white hover: cursor-pointer"
          onClick={handleToggleForm}
        >
          {!togglForm
            ? "If Already Account Please Sign In"
            : "New to Netflix? Sign up now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
