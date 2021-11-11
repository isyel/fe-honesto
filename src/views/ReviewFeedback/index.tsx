import * as React from 'react'
import FeedbackList from '../../components/FeedbackList'
import User from '../../components/User'
import { FeedbackContext, FeedbackT } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
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
      <h1>Review Feedback Given</h1>

      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3>Feedback given</h3>
          </li>
          {feedbacks.map((feedback) => (
            <li>
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
            <h2>{selectedUser?.name}</h2>
          </li>
          <FeedbackList feedbacks={selectedFeedback?.feedback} />
        </ul>
      </div>
    </MainLayout>
  )
}

export default ReviewFeedback
