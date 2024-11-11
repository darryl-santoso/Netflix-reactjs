import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const useUserStarted = () => {
  const { userStarted, setUserStarted } = useContext(AuthContext);
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserStarted((prev)=>({
      ...prev, email: e.target.value
    }))

    if(validateEmail(value)){
      setUserStarted((prev)=>({
        ...prev, errorEmail: ""
      }))
    }
    else {
      setUserStarted((prev)=>({
        ...prev, errorEmail: "Error"
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(userStarted.email.length > 0 && userStarted.errorEmail === ""){
      navigate("/signup");
      return;
    }
    setUserStarted((prev)=>({
      ...prev, errorEmail: "Error"
    }))
  };  

  const resetEmail = () =>{
    setUserStarted((prev)=>({
      email: "",
      errorEmail: ""
    }))
  }

  return {
    handleChange,
    handleSubmit,
    resetEmail,
}
}
export default useUserStarted;