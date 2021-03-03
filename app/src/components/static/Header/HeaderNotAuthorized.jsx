import React from "react";
import { NavLink } from "react-router-dom";

const navMenu = [
  {
    href: "/",
    title: "Главная",
  },
  {
    href: "/auth",
    title: "Register / Login",
  },
];

function Header() {
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
      </header>
    </>
  );
}

export default Header;
