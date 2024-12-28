import { Link } from 'react-router-dom';
import styles from './nav.module.css';

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link className={styles.navLink} to="/">Home</Link>
        </li>
        <li>
        <Link className={styles.navLink} to="/ChatApp">Chat App</Link>
        </li>
        <li>
          <Link className={styles.navLink} to="/Form">Form</Link>
        </li>
        <li>
          <Link className={styles.navLink} to="/task-management">Task Manager</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;