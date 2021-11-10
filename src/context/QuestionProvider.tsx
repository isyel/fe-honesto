import * as React from 'react'

export type QuestionT = {
  id: string
  type: 'scale' | 'text' | 'multipleChoice'
  required: boolean
  label: string
  options?: {
    label: string
    value: number
  }[]
}

type DispatchQuestionContextT = any

export const DispatchQuestionContext =
  React.createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = React.createContext<QuestionT[]>([])

type SetQuestionsT = {
  action: 'set'
  payload: Array<QuestionT>
}

const reducer = (state: QuestionT[], update: SetQuestionsT): QuestionT[] => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('questions', state)

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
