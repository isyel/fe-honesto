import styles from './progress.module.css'
import classNames from 'classnames'

const ProgressBar = (props) => {
  const { scales, value } = props

  return (
    <div className={styles.scales}>
      {[...Array(scales)].map((scale, index) => (
        <div
          className={classNames(
            styles.scale,
            value >= index && styles.selected,
          )}
          key={index}
        ></div>
      ))}
    </div>
  )
}

export default ProgressBar
