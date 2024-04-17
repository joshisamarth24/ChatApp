import { useState,useEffect } from "react";
import toast from "react-hot-toast";

const jwtToken = document.cookie.split("=")[1];
export const useGetConversations = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async () => {
            setLoading(true);   
            try {
                const res = await fetch('https://chatapp-iyi3.onrender.com/api/users',{
                    method:"GET",
                    credentials:"include",
                
                })
                const data = await res.json();
                if(data.error)
                {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        getConversations();
    },[]);
    return {loading,conversations};
}
export default useGetConversations;