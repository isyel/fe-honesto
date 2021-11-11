import * as React from 'react'
import classNames from 'classnames'
import Tooltip from '@mui/material/Tooltip'
import styles from './scale.module.css'

type Props = {
  value: number | string
  scales?: number
  noAction?: boolean
  toolTipText?: string | number
  handleAddChangeAnswer?: (answer: any) => void
}

const Scale = ({
  handleAddChangeAnswer,
  value,
  scales,
  noAction,
  toolTipText,
}: Props) => {
  const [scaleHovered, setScaleHovered] = React.useState(value || -1)

  const handleSelectScale = (value: number) => {
    handleAddChangeAnswer && handleAddChangeAnswer(value + 1)
  }

  const handleHoverScale = (value: number) => {
    setScaleHovered(value)
  }

  let scaleLevel = 0
  if (scales && value) scaleLevel = scales / +value

  console.log(
    'scales: ',
    scales,
    '  value: ',
    value,
    '---- scaleLevel: ',
    scaleLevel,
  )

  return (
    <Tooltip
      title={toolTipText || ''}
      arrow
      placement={'bottom'}
      enterDelay={500}
      leaveDelay={200}
    >
      <div className={styles.scales}>
        <>
          {[...Array(scales)].map((scale, index) => (
            <div
              key={`${Math.random}${index}`}
              className={classNames(
                styles.scale,
                value > index &&
                  (!noAction
                    ? styles.selected
                    : scaleLevel > 2
                    ? styles.selectedDanger
                    : scaleLevel <= 1
                    ? styles.selectedSuccess
                    : styles.selectedWarning),
                scaleHovered >= index && !noAction && styles.hovered,
                !noAction ? styles.scaleHeight : styles.padding,
              )}
              onMouseEnter={() => !noAction && handleHoverScale(index)}
              onMouseLeave={() => !noAction && handleHoverScale(-1)}
              onClick={() => !noAction && handleSelectScale(index)}
            ></div>
          ))}
        </>
      </div>
    </Tooltip>
  )
}

export default Scale
