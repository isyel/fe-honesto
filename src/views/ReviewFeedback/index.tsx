import * as React from 'react'
import FeedbackList from '../../components/FeedbackList'
import User from '../../components/User'
import { FeedbackT } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import classNames from 'classnames'
import { UserContext } from '../../context/UserProvider'
import styles from './reviewFeedback.module.css'
import { ReviewerContext } from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import { getFeedbacks } from '../../common/util'

const ReviewFeedback = () => {
  const reviews = React.useContext(ReviewerContext)
  const users = React.useContext(UserContext)
  const currentUser = React.useContext(AccountContext)
  const search = window.location.search
  const params = new URLSearchParams(search)
  const userId = params.get('user')
  const user = users?.find((user: UserT) => user.id === userId)
  const feedbacks = getFeedbacks(reviews, currentUser)

  const userFeedback = feedbacks.find(
    (feedback) => feedback.user?.id === userId,
  )

  const [selectedUser, setSelectedUser] = React.useState<UserT | any>(
    user || feedbacks[0]?.user,
  )
  const [selectedFeedback, setSelectedFeedback] = React.useState<
    FeedbackT | undefined | any
  >(userFeedback || feedbacks[0])

  const handleSelectUser = (user: UserT) => {
    setSelectedUser(user)
    setSelectedFeedback(
      feedbacks.find((feedback) => feedback.user?.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      {feedbacks?.length > 0 ? (
        <>
          <h1>Review Feedback Given</h1>
          <div className={styles.feedbackContainer}>
            <ul className={styles.users}>
              <li>
                <h3>Feedback given</h3>
              </li>
              {feedbacks.map((feedback, index) => (
                <li
                  className={classNames(
                    styles.user,
                    selectedUser?.id === feedback.user?.id && styles.selected,
                  )}
                  key={`${Math.random}${index}`}
                >
                  <User
                    id={feedback.user?.id}
                    name={feedback.user?.name}
                    avatarUrl={feedback.user?.avatarUrl}
                    handleOnClick={handleSelectUser}
                  />
                </li>
              ))}
            </ul>

            <ul className={styles.feedback}>
              <li>
                <h2>{selectedUser?.name}'s Feedback</h2>
              </li>
              <FeedbackList feedbacks={selectedFeedback?.feedback} />
            </ul>
          </div>
        </>
      ) : (
        <div className={styles.noFeedback}>
          <h1>No feedback to display 😔</h1>
          <p>
            There is no feedback to display at this time - check back in a bit!
          </p>
        </div>
      )}
    </MainLayout>
  )
}

export default ReviewFeedback
