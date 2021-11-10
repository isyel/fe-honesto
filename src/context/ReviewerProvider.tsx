import * as React from 'react'
import { QuestionT } from './QuestionProvider'
import { UserT } from './types'

export type ReviewsT = {
  reviewer: UserT | null
  user: UserT | undefined
  feedbacks: {
    question: QuestionT
    feedback: string | number
  }[]
}

type DispatchReviewerContextT = any

export const DispatchReviewerContext =
  React.createContext<DispatchReviewerContextT | null>(null)
export const ReviewerContext = React.createContext<ReviewsT[]>([])

type SetReviewsT = {
  action: 'review'
  payload: ReviewsT
}

const reducer = (state: ReviewsT[], update: SetReviewsT): ReviewsT[] => {
  if (update.action === 'review') {
    return state.find((reviews) => reviews.user?.id === update.payload.user?.id)
      ? state.map((reviews) =>
          reviews.user?.id === update.payload.user?.id
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
