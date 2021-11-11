import * as React from 'react'
import { OptionsT } from '../../context/QuestionProvider'
import classNames from 'classnames'
import styles from './multiChoiceType.module.css'

type Props = {
  value: number | string | null
  options: OptionsT[] | undefined
  handleAddChangeAnswer: (answer: any) => void
}

const MultiChoiceType = (props: Props) => {
  const { value, options, handleAddChangeAnswer } = props

  const handleSelectOption = (option: number) => {
    handleAddChangeAnswer(option)
  }

  return (
    <div className={styles.wrapper}>
      {options &&
        options.map((option, index) => (
          <div
            key={`${Math.random}${index}`}
            className={classNames(
              styles.option,
              value === option.value && styles.selected,
            )}
            onClick={() => handleSelectOption(option.value)}
          >
            {option.label}
          </div>
        ))}
    </div>
  )
}

export default MultiChoiceType
