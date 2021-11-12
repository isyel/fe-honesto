import { ReviewItemT, ReviewsT } from '../context/ReviewerProvider'
import { UserT } from '../context/types'

export function getFeedbacks(
  reviews: ReviewsT[],
  userData: UserT | null,
): ReviewItemT[] {
  return reviews
    ?.filter((review) =>
      review.reviews.some((review) => review.reviewer?.id === userData?.id),
    )
    .map((user) => ({
      reviewer: user.user,
      feedbacks: user.reviews.find(
        (review) => review.reviewer?.id === userData?.id,
      )?.feedbacks,
    }))
}
