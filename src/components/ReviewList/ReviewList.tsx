import * as React from 'react'
import classNames from 'classnames'
import styles from './reviewList.module.css'
import FeedbackList from '../FeedbackList'
import { ReviewItemT } from '../../context/ReviewerProvider'
import { UserT } from '../../context/types'
import User from '../User'

type Props = {
  userReviews: any[]
  selectedUser?: UserT | null
  selectedFeedback?: ReviewItemT
  handleSelectUser?: (user: UserT) => void
}

const ReviewList = (props: Props) => {
  const { userReviews, selectedUser, selectedFeedback, handleSelectUser } =
    props

  return (
    <>
      <h1>Review Feedback Received</h1>
      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3>Feedback Received</h3>
          </li>
          {userReviews.map((feedback, index) => (
            <li
              className={classNames(
                styles.user,
                selectedUser?.id ===
                  (feedback.reviewer?.id || feedback.user?.id) &&
                  styles.selected,
              )}
              key={`${Math.random}${index}`}
            >
              <User
                id={feedback.reviewer?.id || feedback.user?.id}
                name={feedback.reviewer?.name || feedback.user?.name}
                avatarUrl={
                  feedback.reviewer?.avatarUrl || feedback.user?.avatarUrl
                }
                handleOnClick={handleSelectUser}
              />
            </li>
          ))}
        </ul>

        <ul className={styles.feedback}>
          <li>
            <h2>{selectedUser?.name}'s Review</h2>
          </li>
          <FeedbackList feedbacks={selectedFeedback?.feedbacks} />
        </ul>
      </div>
    </>
  )
}

export default ReviewList
