import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { Link, useHistory } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const currentUser = React.useContext(AccountContext)
  const feedbacks = React.useContext(FeedbackContext)
  const history = useHistory()

  const goToUserFeedback = (userId: string | undefined) => {
    history.push(`/questions/${userId}`)
  }

  const viewSubmission = (userId: string | undefined) => {
    history.push(`/submission/${userId}`)
  }

  const isAlreadyReviewed = (userId: string | undefined) => {
    return feedbacks.some((feedback) => feedback.user?.id === userId)
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <h1>Share Feedback</h1>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users
              .filter((user) => user.id !== currentUser?.id)
              .map((user) => (
                <li key={`${Math.random}${user.id}`} className={styles.user}>
                  <User name={user.name} avatarUrl={user.avatarUrl} />
                  <span style={{ flex: 1 }} />

                  {isAlreadyReviewed(user.id) ? (
                    <Button onClick={() => viewSubmission(user.id)} secondary>
                      View Submission
                    </Button>
                  ) : (
                    <Button onClick={() => goToUserFeedback(user.id)}>
                      Fill out
                    </Button>
                  )}
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
