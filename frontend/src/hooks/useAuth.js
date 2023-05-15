import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    let msgText = "Successfully registered";
    let msgType = "success";

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });

      console.log(data);
      await authUser(data);
    } catch (error) {
      if (error?.response?.data?.message) {
        msgText = error.response.data.message;
      } else {
        msgText = "An error occurred during registration.";
      }

      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  async function authUser(data) {
    console.log(data);

    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  }

  return { authenticated, register };
}
