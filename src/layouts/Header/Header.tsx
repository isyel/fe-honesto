import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  handleThemeChange: (se: React.SyntheticEvent) => void
  darkTheme: boolean
}

const Header = ({ handleThemeChange, darkTheme }: Props) => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)
  const [showMenu, setShowMenu] = React.useState(false)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div className={styles.menu}>
      <div className={styles.header}>
        <h1>Honesto</h1>
        <NavLink exact to="/share-feedback" activeClassName={styles.active}>
          Share Feedback
        </NavLink>
        <NavLink exact to="/my-feedback" activeClassName={styles.active}>
          My Feedback
        </NavLink>
        <NavLink exact to="/submissions" activeClassName={styles.active}>
          Reviews
        </NavLink>
        <div className={styles.menuButton} onClick={handleShowMenu}>
          <MenuIcon />
        </div>
        {darkTheme ? (
          <ToggleOffIcon
            sx={{ fontSize: 40, color: 'white', alignSelf: 'center' }}
            onClick={handleThemeChange}
          />
        ) : (
          <ToggleOnIcon
            sx={{ fontSize: 40, alignSelf: 'center' }}
            onClick={handleThemeChange}
          />
        )}
        <span className={styles.spacer} />
        <NavLink exact to="/" onClick={handleLogout} className={styles.logout}>
          Logout {currentUser && `${currentUser.name}`}
        </NavLink>
      </div>
      {showMenu && (
        <div className={styles.mobileMenu}>
          <NavLink exact to="/share-feedback" activeClassName={styles.active}>
            Share Feedback
          </NavLink>
          <NavLink exact to="/my-feedback" activeClassName={styles.active}>
            My Feedback
          </NavLink>
          <NavLink exact to="/submissions" activeClassName={styles.active}>
            Reviews
          </NavLink>
        </div>
      )}
    </div>
  )
}
export default Header
