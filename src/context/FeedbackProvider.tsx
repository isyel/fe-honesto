import * as React from 'react'
import { QuestionT } from './QuestionProvider'
import { UserT } from './types'

export type FeedbackT = {
  user: UserT | undefined
  feedback: FeedbackItemT[]
}

export type FeedbackItemT = {
  question: QuestionT
  feedback: string | number
  skipped: boolean
}

type DispatchFeedbackContextT = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = React.createContext<FeedbackT[]>([])

type SetFeedbacksT = {
  action: 'feedback'
  payload: FeedbackT
}

const reducer = (state: FeedbackT[], update: SetFeedbacksT): FeedbackT[] => {
  if (update.action === 'feedback') {
    return [...state, update.payload]
  } else if (update.action === 'logout') {
    return []
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('Feedbacks', state)

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
