import React from "react";
import { useForm } from "react-hook-form";

function Form({
  onSubmit,
  notHasToken,
  setNotHasToken,
  message,
  passwordType,
  setPasswordType,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      {notHasToken && <h1>Register</h1>}
      {!notHasToken && <h1>Login</h1>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {notHasToken && (
          <>
            <input
              autoComplete="off"
              name="name"
              placeholder="name"
              ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
            />
            {errors.name && errors.name.type === "required" && (
              <div>
                <span>This field is required</span>
              </div>
            )}
            {errors.name && errors.name.type === "pattern" && (
              <div>
                <span>This field is not correct</span>
              </div>
            )}

            <input
              autoComplete="off"
              name="surname"
              placeholder="surname"
              ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
            />
            {errors.surname && errors.surname.type === "required" && (
              <div>
                <span>This field is required</span>
              </div>
            )}
            {errors.surname && errors.surname.type === "pattern" && (
              <div>
                <span>This field is not correct</span>
              </div>
            )}

            <input
              autoComplete="off"
              name="age"
              placeholder="age"
              ref={register({ required: true, pattern: /^[0-9]+$/i })}
            />
            {errors.age && errors.age.type === "required" && (
              <div>
                <span>This field is required</span>
              </div>
            )}
            {errors.age && errors.age.type === "pattern" && (
              <div>
                <span>This field is not correct</span>
              </div>
            )}
          </>
        )}

        <input
          autoComplete="off"
          name="email"
          placeholder="email"
          ref={register({ required: true, pattern: /^[A-Za-z0-9-_@.]+$/i })}
        />
        {errors.email && errors.email.type === "required" && (
          <div>
            <span>This field is required</span>
          </div>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <div>
            <span>This field is not correct</span>
          </div>
        )}

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={passwordType}
            autoComplete="off"
            name="password"
            placeholder="password"
            ref={register({ required: true, minLength: 5 })}
          />

          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "13px",
              right: "17px",
            }}
            onClick={() =>
              setPasswordType(passwordType === "password" ? "text" : "password")
            }
          >
            &#128293;
          </div>
        </div>

        {errors.password && errors.password.type === "required" && (
          <div>
            <span>This field is required</span>
          </div>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <div>
            <span>This field is not correct, min length of 6</span>
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
    </div>
  );
}

export default Form;
