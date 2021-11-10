import * as React from 'react'
import classNames from 'classnames'
import styles from './scaletype.module.css'

type Props = {
  value: number
  scales?: number
  handleAnswerChange: (value: number) => void
}

const Scale = ({ handleAnswerChange, value, scales }: Props) => {
  const [scaleSelected, setScaleSelected] = React.useState(value || -1)
  const [scaleHovered, setScaleHovered] = React.useState(value || -1)

  const handleSelectScale = (value: number) => {
    setScaleSelected(value)
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
            scaleSelected >= index && styles.selected,
            scaleHovered >= index && styles.hovered,
          )}
          onMouseEnter={() => handleHoverScale(index)}
          onMouseLeave={() => handleHoverScale(-1)}
          onClick={() => handleSelectScale(index)}
        ></div>
      ))}
    </div>
  )
}

export default Scale
