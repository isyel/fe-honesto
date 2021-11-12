import * as React from 'react'
import { UserT } from '../../context/types'
import MainLayout from '../../layouts/MainLayout'
import styles from './submissions.module.css'
import { ReviewerContext, ReviewsT } from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import ReviewList from '../../components/ReviewList'

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
          <h1 className={styles.title}>Review Feedback Received</h1>
          <ReviewList
            userReviews={userReviews}
            selectedUser={selectedUser}
            selectedFeedback={selectedFeedback}
            handleSelectUser={handleSelectUser}
          />
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
