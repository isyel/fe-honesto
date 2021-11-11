import * as React from 'react'
import { QuestionT } from './QuestionProvider'
import { UserT } from './types'

export type ReviewsT = {
  user: UserT | undefined | null
  reviews: ReviewItemT[]
}

export type ReviewItemT = {
  reviewer: UserT | undefined | null
  feedbacks: FeedbackItemT[] | undefined
}

export type ReviewItemPayloadT = {
  user: UserT | undefined | null
  feedbacks: ReviewItemT
}

export type FeedbackT = {
  user: UserT | undefined | null
  feedback: FeedbackItemT[] | undefined
}

export type FeedbackItemT = {
  question: QuestionT
  feedback: string | number
  skipped: boolean
}

type DispatchReviewerContextT = any

export const DispatchReviewerContext =
  React.createContext<DispatchReviewerContextT | null>(null)
export const ReviewerContext = React.createContext<ReviewsT[]>([])

type SetReviewsT = {
  action: 'review'
  payload: ReviewItemPayloadT
}

const reducer = (state: ReviewsT[], update: SetReviewsT): ReviewsT[] => {
  if (update.action === 'review') {
    return state.find((reviews) => reviews.user?.id === update.payload.user?.id)
      ? state.map((review) =>
          review.user?.id === update.payload.user?.id
            ? {
                ...review,
                reviews: [...review.reviews, update.payload.feedbacks],
              }
            : review,
        )
      : [
          ...state,
          {
            user: update.payload.user,
            reviews: [update.payload.feedbacks],
          },
        ]
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('Reviews', state)

  return (
    <DispatchReviewerContext.Provider value={dispatch}>
      <ReviewerContext.Provider value={state}>
        {children}
      </ReviewerContext.Provider>
    </DispatchReviewerContext.Provider>
  )
}

export default UIProvider
