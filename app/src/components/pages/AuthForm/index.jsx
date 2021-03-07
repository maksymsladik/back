import React, { useState, useContext } from "react";
import { Context } from "../../context";
import RequestApi from "../../lib/RequestApi";
import Form from "./components/Form";

function Auth() {
  const { setAuthorized } = useContext(Context);
  const [notHasToken, setNotHasToken] = useState(true);
  const [message, setMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const onSubmit = (data, e) => {
    const path = notHasToken ? "register" : "login";

    RequestApi.post(`/auth/${path}`, data)
      .then((res) => {
        if (!res.status) {
          /* e.target.reset(); */
          setMessage(res.message);
          return setTimeout(() => {
            setMessage("");
          }, 1500);
        }

        localStorage.setItem(
          "userData",
          JSON.stringify({ userToken: res.userToken })
        );
        setAuthorized({ userToken: res.userToken });
      })
      .catch((e) => {
        setMessage("Что-то пошло не так.");
        e.target.reset();
        setTimeout(() => {
          setMessage("");
        }, 1500);
      });
  };

  return (
    <Form
      onSubmit={onSubmit}
      notHasToken={notHasToken}
      setNotHasToken={setNotHasToken}
      message={message}
      passwordType={passwordType}
      setPasswordType={setPasswordType}
    />
  );
}

export default Auth;
