import * as React from 'react'
import { FeedbackT } from './FeedbackProvider'
import { UserT } from './types'

export type ReviewsT = {
  user: UserT
  feedbacks: FeedbackT[]
}

type DispatchReviewerContextT = any

export const DispatchReviewerContext =
  React.createContext<DispatchReviewerContextT | null>(null)
export const ReviewerContext = React.createContext<ReviewsT[]>([])

type SetReviewsT = {
  action: 'reviewer'
  payload: ReviewsT
}

const reducer = (state: ReviewsT[], update: SetReviewsT): ReviewsT[] => {
  if (update.action === 'reviewer') {
    return state.find((reviews) => reviews.user.id === update.payload.user.id)
      ? state.map((reviews) =>
          reviews.user.id === update.payload.user.id
            ? {
                ...reviews,
                feedbacks: [...reviews.feedbacks, ...update.payload.feedbacks],
              }
            : reviews,
        )
      : [...state, update.payload]
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
