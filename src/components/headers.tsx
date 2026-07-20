import { Link } from "react-router";

export default function Header() {
    return (
        <nav className="top-nav">
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
        </nav>
    )
}