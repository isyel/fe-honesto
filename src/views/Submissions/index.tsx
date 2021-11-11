import * as React from 'react'
import User from '../../components/User'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import classNames from 'classnames'
import styles from './submissions.module.css'
import { ReviewerContext, ReviewsT } from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import FeedbackList from '../../components/FeedbackList'

const Submissions = () => {
  const submissions = React.useContext(ReviewerContext)
  const currentUser = React.useContext(AccountContext)
  const userReviews = submissions.find(
    (submission) => submission.user?.id === currentUser?.id,
  )?.reviews

  const [selectedUser, setSelectedUser] = React.useState<
    UserT | undefined | null
  >(userReviews ? userReviews[0]?.reviewer : undefined)

  const [selectedFeedback, setSelectedFeedback] = React.useState<
    ReviewsT | undefined | any
  >(userReviews ? userReviews[0] : undefined)

  const handleSelectUser = (user: UserT) => {
    setSelectedUser(user)
    setSelectedFeedback(
      userReviews?.find((feedback) => feedback.reviewer?.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      {userReviews && userReviews?.length > 0 ? (
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
                    selectedUser?.id === feedback.reviewer?.id &&
                      styles.selected,
                  )}
                  key={`${Math.random}${index}`}
                >
                  <User
                    id={feedback.reviewer?.id}
                    name={feedback.reviewer?.name}
                    avatarUrl={feedback.reviewer?.avatarUrl}
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
      ) : (
        <div className={styles.noFeedback}>
          <h1>No Reviews received 😔</h1>
          <p>
            There is no reviews to display at this time - check back in a bit!
          </p>
        </div>
      )}
    </MainLayout>
  )
}

export default Submissions
