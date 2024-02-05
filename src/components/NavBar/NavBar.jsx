import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut()
        setUser()
    }

    return (
        <nav className='NavBar'>
            <div className='left'>
                <span>Welcome to HandyBillz, {user.name}!</span>
            </div>
            <div className="center">
                <Link to="/invoices"> Invoices </Link>
                <Link to="/projects"> Projects </Link>
                <Link to="/invoices/new"> Add Invoice Item </Link>
                {/* if user role is admin, show Create Project navbar icon */}
                {user.role === 'admin' && <Link to="/projects/new"> Create Project </Link>}
            </div>
            <div className="right">
                <span onClick={handleLogOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </span>
                </div>
        </nav>
    )
}