import checkValidData from "../utils/validate"
import Header from "./Header"
import { useState,useRef } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BACKGROUND_IMG } from "../utils/constants"

const Login = () => {

  const dispatch = useDispatch();
  const [isToggleSignIn,setIsToggleSignIn] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  const toggleSignIn = ()=>{
    setIsToggleSignIn(!isToggleSignIn)
  }

  const name = useRef(null)
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () =>{

    const message = checkValidData(email.current.value,password.current.value)
    setErrorMessage(message)

    if(message) return;

    if(!isToggleSignIn){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then((userCredential)=>{
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value
                }).then(() => {
                    const {uid,email,displayName} = auth.currentUser;
                    dispatch(addUser(
                      { uid:uid,
                        email:email,
                        displayName:displayName}))
                }).catch((error) => {
                    setErrorMessage(error.message);
        });
          })
          .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage)
                    })
    }
    else{
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then(()=>{
          })
          .catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage)
                    })
    }

  }

  return (
    <div>
          <Header/>
          <div className="absolute">
            <img
            className="h-screen object-cover md:w-screen"
            src={BACKGROUND_IMG}
            alt="logo" />
          </div>
          <form onSubmit={(e)=>{e.preventDefault()}}
          className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white opacity-80">
            <h1 className="my-4  font-bold text-2xl">
              {isToggleSignIn? "Sign In":"Sign Up"}
            </h1>
            {!isToggleSignIn && <input type="text" ref={name} placeholder="Full Name" className="my-4 p-2 w-full bg-slate-700"/>}
            <input ref={email} type="text" placeholder="Email Address" className="my-4 p-2 w-full bg-slate-700"/>
            <input ref={password} type="password" placeholder="Password" className="my-4 p-2 w-full bg-slate-700"/>
            <p className="my-4 text-red-600 font-bold text-lg">{errorMessage}</p>
            <button className="my-4 p-4 bg-red-500 w-full" onClick={handleButtonClick}>Sign In</button>
            <p className="my-4 cursor-pointer" onClick={toggleSignIn}> {isToggleSignIn? "New to Netflix? Sign Up" : "Already have an account? Sign In"} </p>
          </form>
    </div>

  )
}

export default Login