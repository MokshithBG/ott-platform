import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store)=> store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    navigate("/")
}).catch((error) => {
    navigate("/error")
});
  }

      useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
  if (user) {

    const {uid,email,displayName} = user;
    dispatch(addUser({
      uid:uid,
      email:email,
      displayName:displayName}))

      navigate("/browse");

  } else {
    dispatch(removeUser())
    navigate("/");
  }
});
    },[dispatch, navigate])

  return (
    <div className='absolute z-30 px-8 bg-gradient-to-b  from-black w-screen flex justify-between'>
        <img className="mx-auto w-44 h-36 md:mx-0"
        src={LOGO}
        alt="logo" />
        {user && <div className="flex items-center justify-between">
          <img
          className="w-12 h-12 m-4"
          src={USER_AVATAR}
          alt="profile pic"></img>
          <p className="m-4 p-3 font-bold text-white">{user?.displayName}</p>
          <button onClick={handleSignOut} className="m-4 px-4 py-2 text-white font-bold cursor-pointer">(Sign out)</button>
        </div>}
    </div>
  )
}

export default Header