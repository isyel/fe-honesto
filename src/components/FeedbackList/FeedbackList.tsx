import * as React from 'react'
import { FeedbackItemT } from '../../context/ReviewerProvider'
import FeedbackItem from '../FeedbackItem'
import styles from './feedBackList.module.css'

type Props = {
  feedbacks?: FeedbackItemT[]
}

const FeedbackList = ({ feedbacks }: Props) => {
  return (
    <div className={styles.feedbacks}>
      {feedbacks?.map((feedback, index) => (
        <li key={`${Math.random}${index}`}>
          <FeedbackItem feedbackItem={feedback} />
        </li>
      ))}
    </div>
  )
}

export default FeedbackList
