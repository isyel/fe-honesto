import * as React from 'react'
import { UserT } from '../../context/types'
import styles from './user.module.css'

type Props = {
  id?: string
  name?: string
  avatarUrl?: string
  handleOnClick?: (user: UserT) => void
}

const User = (props: Props) => {
  const { id, name, avatarUrl, handleOnClick } = props
  const initials = name
    ?.split(' ')
    .map((word) => word[0])
    .join('')

  const handleOnSelectUser = () => {
    if (handleOnClick) {
      const user = {
        id,
        name,
        avatarUrl,
      }
      handleOnClick(user)
    }
  }

  return (
    <div className={styles.user} onClick={handleOnSelectUser}>
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {name}
    </div>
  )
}

export default User
