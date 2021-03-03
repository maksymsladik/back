import React, { useEffect, useState } from "react";
import Router from "../Router";
import HeaderAuthorized from "../static/Header/HeaderAuthorized";
import HeaderNotAuthorized from "../static/Header/HeaderNotAuthorized";
import Footer from "../static/Footer";
import { Context } from "../context";
import RequestApi from "../lib/RequestApi";

function App() {
  const [authorized, setAuthorized] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  const [access, setAccess] = useState("");

  useEffect(() => {
    if (!authorized) return setAccess(false);

    RequestApi.get("/auth/check", authorized.userToken)
      .then((res) => {
        setAccess(res.status);

        localStorage.setItem(
          "userData",
          JSON.stringify({ userToken: res.userToken })
        );
      })
      .catch((e) => console.log(e));
  }, [authorized]);

  return (
    <Context.Provider value={{ setAuthorized }}>
      {(!access && <HeaderNotAuthorized />) || <HeaderAuthorized />}
      <main className="main">
        <Router access={access} />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
