import './appHeader.scss';
import { NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {
    const location = useLocation();

    // Проверяем, начинается ли путь с /characters
    const isCharactersActive = location.pathname.startsWith("/characters");

    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink to="/characters" className="app__title-link">
                    <span>Marvel information portal</span>
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to="/characters"
                            className={isCharactersActive ? "active" : ""}
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            to="/comics"
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
