import { Link, useLocation } from "react-router-dom";
import "../index.css";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1>
                    Site de Visualisation
                </h1>
                <div className="navbar-links">
                    <Link
                        className={location.pathname === "/" ? "active" : ""}
                        to="/">
                        Visualisation
                    </Link>
                    <Link
                        className={location.pathname === "/donnees" ? "active" : ""}
                        to="/donnees">
                        Données
                    </Link>
                </div>
            </div>
        </nav>
    );
}
