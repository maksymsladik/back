import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context";
import RequestApi from "../../lib/RequestApi";

function Auth() {
  const { register, handleSubmit, errors } = useForm();
  const { setAuthorized } = useContext(Context);
  const [notHasToken, setNotHasToken] = useState(true);
  const [writers, setWriters] = useState([]);
  const [message, setMessage] = useState("");

  const getWritersList = () => {
    RequestApi.get("/auth/writers")
      .then((res) => setWriters(res.data))
      .catch((e) => console.log(e));
  };

  const onSubmit = (data, e) => {
    const path = notHasToken ? "register" : "login";

    RequestApi.post(`/auth/${path}`, data)
      .then((res) => {
        if (!res.status) {
          e.target.reset();
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

  const deleteThisWriter = (id) => {
    RequestApi.deleteThis(`/auth/writers/${id}`)
      .then((res) => {
        console.log(res);
        getWritersList();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {notHasToken && <h1>Register</h1>}
      {!notHasToken && <h1>Login</h1>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          name="email"
          placeholder="Enter your email"
          ref={register({ required: true })}
        />
        {errors.email && (
          <div>
            <span>Email is required</span>
          </div>
        )}

        <input
          autoComplete="off"
          name="password"
          placeholder="Enter your password"
          ref={register({ required: true })}
        />
        {errors.password && (
          <div>
            <span>Password is required</span>
          </div>
        )}

        {notHasToken && (
          <div>
            Есть аккаунт?&nbsp;
            <b
              onClick={() => setNotHasToken(false)}
              style={{ cursor: "pointer" }}
            >
              Войдите!
            </b>
          </div>
        )}

        {!notHasToken && (
          <div>
            Нет аккаунта?&nbsp;
            <b
              onClick={() => setNotHasToken(true)}
              style={{ cursor: "pointer" }}
            >
              Зарегистрируйся!
            </b>
          </div>
        )}

        <div className="submit__container">
          {notHasToken && (
            <input className="btn__register" type="submit" value="Register" />
          )}

          {!notHasToken && (
            <input className="btn__login" type="submit" value="Login" />
          )}
        </div>
      </form>

      {message && <h1 className="message">{message}</h1>}

      <div onClick={getWritersList} style={{ cursor: "pointer" }}>
        Получить весь список писателей
      </div>

      <div>
        {writers.map(({ id, email }) => (
          <div key={id} style={{ border: "1px solid red" }}>
            <div
              onClick={() => deleteThisWriter(id)}
              style={{ cursor: "pointer" }}
            >
              <b>Delete this user</b>
            </div>
            <div>User # {id}</div>
            <div>{email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Auth;
