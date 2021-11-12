import * as React from 'react'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import { UserContext } from '../../context/UserProvider'
import styles from './reviewFeedback.module.css'
import { FeedbackT, ReviewerContext } from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import { getFeedbacks } from '../../common/util'
import ReviewList from '../../components/ReviewList'

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
    (feedback) => feedback.reviewer?.id === userId,
  )

  const [selectedUser, setSelectedUser] = React.useState<UserT | any>(
    user || feedbacks[0]?.reviewer,
  )
  const [selectedFeedback, setSelectedFeedback] = React.useState<
    FeedbackT | undefined | any
  >(userFeedback || feedbacks[0])

  const handleSelectUser = (user: UserT) => {
    setSelectedUser(user)
    setSelectedFeedback(
      feedbacks.find((feedback) => feedback.reviewer?.id === user.id),
    )
  }

  return (
    <MainLayout loggedIn>
      {feedbacks?.length > 0 ? (
        <>
          <h1>Review Feedback Received</h1>
          <ReviewList
            userReviews={feedbacks}
            selectedUser={selectedUser}
            selectedFeedback={selectedFeedback}
            handleSelectUser={handleSelectUser}
          />
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
