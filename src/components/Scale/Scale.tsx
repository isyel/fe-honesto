import * as React from 'react'
import classNames from 'classnames'
import styles from './scaletype.module.css'

type Props = {
  value: number | string
  scales?: number
  handleAddChangeAnswer: (answer: any) => void
}

const Scale = ({ handleAddChangeAnswer, value, scales }: Props) => {
  const [scaleHovered, setScaleHovered] = React.useState(value || -1)

  const handleSelectScale = (value: number) => {
    handleAddChangeAnswer(value)
  }

  const handleHoverScale = (value: number) => {
    setScaleHovered(value)
  }

  return (
    <div className={styles.scales}>
      {[...Array(scales)].map((scale, index) => (
        <div
          className={classNames(
            styles.scale,
            value >= index && styles.selected,
            scaleHovered >= index && styles.hovered,
          )}
          onMouseEnter={() => handleHoverScale(index)}
          onMouseLeave={() => handleHoverScale(-1)}
          onClick={() => handleSelectScale(index)}
          key={index}
        ></div>
      ))}
    </div>
  )
}

export default Scale
