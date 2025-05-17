import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  // Key to uniquely store messages for each conversation
  const localStorageKey = selectedConversation
    ? `messages-${selectedConversation._id}`
    : null;

  // Load from localStorage on conversation change
  useEffect(() => {
    if (localStorageKey) {
      const cachedMessages = localStorage.getItem(localStorageKey);
      if (cachedMessages) {
        setMessage(JSON.parse(cachedMessages));
      }
    }
  }, [localStorageKey, setMessage]);

  // Fetch messages from API and store in localStorage
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation || !selectedConversation._id) return;

      setLoading(true);
      try {
        const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
        setMessage(res.data);

        // Store to localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(res.data));

      } catch (error) {
        console.log("Error in getting messages", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessage, localStorageKey]);

  return { loading, messages };
};

export default useGetMessage;
