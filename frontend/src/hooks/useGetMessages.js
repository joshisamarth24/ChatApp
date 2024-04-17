import { useEffect, useState } from "react"
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../Zustand/useGroup";

const useGetMessages = () =>{
    let url = "https://chatapp-iyi3.onrender.com/api/messages/"
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const {selectedGroup,groupMessages,setGroupMessages} = useGroup();
    if(selectedGroup){
        url = url + "group/" + selectedGroup._id;
    }
    else if(selectedConversation){
        url = url + selectedConversation._id;
    }

    useEffect(()=>{
        const getMessages = async()=>{
            try{
                setLoading(true);
                const res = await fetch(url,{
                    credentials: 'include',
                    headers: {
                        jwtToken: document.cookie.split('=')[1],
                    }
                });
                const data = await res.json();
                if(data.error)
                {
                    throw new Error(data.error);
                }
                if(selectedGroup){
                    setGroupMessages(data);
                }
                else if(selectedConversation){
                setMessages(data);
                }
            }catch(err){
                toast.error(err.message);
            }
            finally{
                setLoading(false);
            }
        }
        if(selectedConversation?._id || selectedGroup?._id)
        {
            getMessages();
        }
    },[selectedConversation?._id,selectedGroup?._id])
    return {messages,groupMessages,loading};
}
export default useGetMessages;
