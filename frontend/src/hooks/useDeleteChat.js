import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import useGroup from "../Zustand/useGroup";

export const useDeleteChat = () => {
    const [loading,setLoading] = useState(false);
    const {setMessages,selectedConversation} = useConversation();
    const {setGroupMessages,selectedGroup} = useGroup();
    const convId = selectedConversation? selectedConversation._id : selectedGroup?._id;
        const clearChat = async()=>{
            setLoading(true);
            try {
                const res = await fetch(`https://chatapp-iyi3.onrender.com/api/chat/clear/${convId}`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(res.status === 200 && selectedConversation){
                    setMessages([]);
                }
                if(res.status === 200 && selectedGroup){
                    setGroupMessages([]);
                }
            } catch (error) {
                toast.error('Error clearing chat');
                console.log(error)
            }
            finally{
                setLoading(false);
            }
        }
        

    return {loading,clearChat};
}

export default useDeleteChat;