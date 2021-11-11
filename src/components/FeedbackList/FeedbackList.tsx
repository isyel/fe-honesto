import * as React from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import styles from './feedbacklist.module.css'

type Props = {
  feedbacks?: { question: QuestionT; feedback: string | number }[]
}

const FeedbackList = ({ feedbacks }: Props) => {
  return (
    <div className={styles.feedbacks}>
      {feedbacks?.map((feedback) => (
        <li>feedbacks</li>
      ))}
    </div>
  )
}

export default FeedbackList
