import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
	const URL = "http://3.111.213.157:5002";
	console.log("API URL:",URL);
	if (!token) {
		console.error("No token found");
		return;
	}else{
		console.log("Token: ",token);
	}
        const response = await axios.get(`${URL}/api/user/allusers`, {
//          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
         },
        });
//        console.log("API URL:", import.meta.env.VITE_SOCKET_URL);
//        const URL = import.meta.env.VITE_SOCKET_URL;
	
//        const response = await axios.get( `${URL}/api/user/allusers`,
//              { withCredentials: true }
//        );

        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;
