import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../context";

const navMenu = [
  {
    href: "/",
    title: "Главная",
  },
  {
    href: "/my-articles",
    title: "Мои статьи",
  },
];

function Header() {
  const { setAuthorized } = useContext(Context);

  const onLogOut = () => {
    setAuthorized("");
    localStorage.removeItem("userData");
  };

  return (
    <>
      <header className="header">
        <nav>
          <ul>
            {navMenu.map(({ href, title }) => {
              return (
                <li key={href}>
                  <NavLink exact to={href} activeClassName="active">
                    {title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <input
          className="btn__logout"
          onClick={onLogOut}
          type="submit"
          value="Log Out"
        />
      </header>
    </>
  );
}

export default Header;
