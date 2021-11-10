import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import Button from '../../components/Button'

type Props = {
  handleThemeChange: (se: React.SyntheticEvent) => void
  darkTheme: boolean
}

const Header = ({ handleThemeChange }: Props) => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)

  console.log('current user', currentUser)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <div className={styles.header}>
      <h1>Honesto</h1>
      <NavLink exact to="/share-feedback" activeClassName={styles.active}>
        Share Feedback
      </NavLink>
      <NavLink exact to="/my-feedback" activeClassName={styles.active}>
        My Feedback
      </NavLink>
      <Button onClick={handleThemeChange}>Switch Theme</Button>
      <span className={styles.spacer} />
      <NavLink exact to="/" onClick={handleLogout}>
        Logout {currentUser && `${currentUser.name}`}
      </NavLink>
    </div>
  )
}
export default Header
