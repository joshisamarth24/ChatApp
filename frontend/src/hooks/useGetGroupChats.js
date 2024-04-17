import { useEffect, useState } from "react";

const useGetGroupChats = () => {
    const [loading, setLoading] = useState(true);
    const [groupChats, setGroupChats] = useState([]);

    useEffect(() => {
        const getGroupChats = async () => {
            try {
                const res = await fetch('https://chatapp-iyi3.onrender.com/api/chat/groupChat', {
                    method: "GET",
                    credentials: "include",
                    headers:{
                        jwtToken: document.cookie.split('=')[1],
                    }
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setGroupChats(data.data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        getGroupChats();
    },[]);
    return {loading,groupChats};
};

export default useGetGroupChats;