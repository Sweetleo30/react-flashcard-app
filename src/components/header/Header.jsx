import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo.png";
import './Header.scss';

function Header() {
    return (

        <header className="header">
            <div className="header__container">
                <div className="navbar__wrap">
                    <Link to="/">
                        <img src={logo} className="header__logo" alt="logo" />
                    </Link>
                    <nav className="header__menu menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <Link to="/" className="menu__link">Home</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="/game" className="menu__link">Game</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
