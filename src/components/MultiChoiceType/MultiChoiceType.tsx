import * as React from 'react'
import { OptionsT } from '../../context/QuestionProvider'
import classNames from 'classnames'
import styles from './multichoicetype.module.css'

type Props = {
  value: number | null
  options: OptionsT[] | undefined
  handleAnswerChange: (value: number) => void
}

const MultiChoiceType = (props: Props) => {
  const { value, options, handleAnswerChange } = props
  const [selected, setSelected] = React.useState(value || null)

  const handleSelectOption = (option: number) => {
    setSelected(option)
  }

  return (
    <div className={styles.wrapper}>
      {options &&
        options.map((option, index) => (
          <div
            key={index}
            className={classNames(
              styles.option,
              selected === option.value && styles.selected,
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
