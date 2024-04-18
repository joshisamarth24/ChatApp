import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();

  const signup = async (UserDetails) => {
    // const success = handleInputErrors({fullName,username,email,password,confirmPassword,profilePic});
    // if (!success) return;
    setLoading(true);

    try {
      const res = await fetch('https://chatapp-iyi3.onrender.com/api/auth/signup',{
        method:"POST",
        body: UserDetails
      })

      const data = await res.json();
      if(data.error)
      {
        throw new Error(data.error);
      }

      localStorage.setItem("user",JSON.stringify(data));
      toast.success("Signed up successfully.");
      setUser(data);


    } catch (error) {

      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }
  return {loading,signup};
}


const handleInputErrors = ({fullName,username,email,password,confirmPassword,profilePic}) => {
  if(!fullName || !username || !email || !password || !confirmPassword) {
    toast.error("All fields are required.");
    return false;
  }
  if(password !== confirmPassword) {
    toast.error("Password doesn't match.");
    return false;
  }
  return true;
};


export default useSignUp;