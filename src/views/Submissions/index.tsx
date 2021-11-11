import * as React from 'react'
import User from '../../components/User'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import classNames from 'classnames'
import styles from './submissions.module.css'
import { UserContext } from '../../context/UserProvider'
import { ReviewerContext, ReviewsT } from '../../context/ReviewerProvider'

const Submissions = () => {
  const submissions = React.useContext(ReviewerContext)
  const users = React.useContext(UserContext)
  const search = window.location.search

  const [selectedUser, setSelectedUser] = React.useState<UserT | undefined>(
    submissions[0]?.user,
  )
  const [selectedFeedback, setSelectedFeedback] = React.useState<
    ReviewsT | undefined
  >(submissions[0])

  console.log('submissions: ', submissions)

  const handleSelectUser = (user: UserT) => {
    setSelectedUser(user)
    setSelectedFeedback(
      submissions.find((feedback) => feedback.user?.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      {submissions?.length > 0 ? (
        <>
          <h1>Review Feedback Given</h1>
          <div className={styles.feedbackContainer}>
            <ul className={styles.users}>
              <li>
                <h3>Feedback given</h3>
              </li>
              {submissions.map((feedback, index) => (
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
                <h2>{selectedUser?.name}'s Feedback</h2>
              </li>
              {/* <FeedbackList feedbacks={selectedFeedback?.feedback} /> */}
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

export default Submissions
