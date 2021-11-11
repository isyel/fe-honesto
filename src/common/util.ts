import { FeedbackT, ReviewsT } from '../context/ReviewerProvider'
import { UserT } from '../context/types'

export function getFeedbacks(
  reviews: ReviewsT[],
  userData: UserT | null,
): FeedbackT[] {
  return reviews
    ?.filter((review) =>
      review.reviews.some((review) => review.reviewer?.id === userData?.id),
    )
    .map((user) => ({
      user: user.user,
      feedback: user.reviews.find(
        (review) => review.reviewer?.id === userData?.id,
      )?.feedbacks,
    }))
}
