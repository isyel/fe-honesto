import * as React from 'react'
import FeedbackList from '../../components/FeedbackList'
import User from '../../components/User'
import { FeedbackContext, FeedbackT } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import classNames from 'classnames'
import styles from './reviewFeedback.module.css'

const ReviewFeedback = () => {
  const feedbacks = React.useContext(FeedbackContext)
  const [selectedUser, setSelectedUser] = React.useState<UserT | undefined>(
    feedbacks[0]?.user,
  )
  const [selectedFeedback, setSelectedFeedback] = React.useState<
    FeedbackT | undefined
  >(feedbacks[0])

  const handleSelectUser = (user: UserT) => {
    setSelectedUser(user)
    setSelectedFeedback(
      feedbacks.find((feedback) => {
        console.log('feedback.user?.id: ', feedback.user?.id)
        console.log('user.id: ', user.id)

        return feedback.user?.id === user.id
      }),
    )
  }

  console.log('selectedFeedback: ', selectedFeedback)
  console.log('feedbacks: ', feedbacks)

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
