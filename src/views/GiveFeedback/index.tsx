import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { Link, useHistory } from 'react-router-dom'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const history = useHistory()

  const goToUserFeedback = (userId: string) => {
    history.push(`questions/${userId}`)
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button onClick={() => goToUserFeedback(user.id)}>
                  Fill out
                </Button>
                <Link to="/components">Go to component</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
