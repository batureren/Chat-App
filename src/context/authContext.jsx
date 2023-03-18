import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { auth } from "./../auth/firebase";
  import { useNavigate } from "react-router-dom";
  import {
    toastErrorNotify,
    toastSuccessNotify,
    toastWarnNotify
  } from "../helpers/ToastNotify";
  export const AuthContext = createContext();
  const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
      JSON.parse(sessionStorage.getItem("user")) || false
    );
    const navigate = useNavigate();
    useEffect(() => {
      userObserver();
    }, []);
    const createUser = async (email, password, displayName) => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        })
        navigate("/");
        toastSuccessNotify("Registered successfully!")
      } catch (error) {
        toastErrorNotify(error.message)
      }
    };
    const signIn = async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
        toastSuccessNotify("Logged in successfully!")
      } catch (error) {
        toastErrorNotify(error.message)
      }
    };
    const logOut = () => {
      signOut(auth);
    };
    const signUpProvider = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          navigate("/")
          toastSuccessNotify("Logged in successfully!")
        })
        .catch((error) => toastErrorNotify(error.message));
    };
    const userObserver = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { email, displayName } = user;
          setCurrentUser({ email, displayName });
          sessionStorage.setItem("user", JSON.stringify({ email, displayName }));
        } else {
          setCurrentUser(false);
          sessionStorage.clear();
        }
      });
    };
    const forgotPassword = (email) => {
      sendPasswordResetEmail(auth, email)
      .then(()=> toastWarnNotify("Please check your mail box!"))
      .catch(error => toastErrorNotify(error.message))
    }
    const values = { createUser, signIn, logOut, currentUser, signUpProvider, forgotPassword };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
  };
  export default AuthContextProvider;