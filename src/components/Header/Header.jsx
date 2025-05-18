import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <NavLink to="/" className={s.logo}>
          <svg width="102" height="16">
            <use href="/icons/symbol-definitions.svg#icon-RentalCar" />
          </svg>
        </NavLink>

        <nav className={s.nav}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? s.active : s.link)}
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
