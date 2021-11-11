import * as React from 'react'
import { FeedbackItemT } from '../../context/FeedbackProvider'
import Scale from '../Scale'
import styles from './feedBackItem.module.css'

type Props = {
  feedbackItem?: FeedbackItemT
}

const FeedBackItem = ({ feedbackItem }: Props) => {
  let toolTipText

  if (
    feedbackItem?.question?.options &&
    typeof feedbackItem?.feedback === 'number'
  ) {
    toolTipText =
      feedbackItem?.question?.options[feedbackItem?.feedback - 1]?.label
  }

  const feedbackValue = feedbackItem?.feedback
    ? +feedbackItem?.feedback - 1
    : -1

  return (
    <div className={styles.feedback}>
      <p>{feedbackItem?.question.label}</p>
      <div className={styles.feedback__item}>
        {feedbackItem?.skipped ? (
          <span className={styles.feedback__skipped}>Skipped</span>
        ) : (
          <>
            {feedbackItem?.question.type === 'text' ? (
              <p className={styles.feedback__item__text}>
                {feedbackItem.feedback}
              </p>
            ) : (
              <Scale
                scales={feedbackItem?.question.options?.length || 10}
                value={feedbackValue}
                noAction={true}
                toolTipText={toolTipText || ''}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default FeedBackItem
