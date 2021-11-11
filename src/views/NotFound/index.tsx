import { useHistory } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import styles from './notFound.module.css'

const NotFound = () => {
  const history = useHistory()
  const goToFeedbackPage = () => {
    history.push('/share-feedback')
  }

  return (
    <MainLayout loggedIn>
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundHeader}>404</h1>
          <p className={styles.notFoundText}>
            Sorry, the URL you have used may be incorrect. 😢
          </p>
          <p>Check the spelling or navigate using the menu above.</p>
          <Button onClick={goToFeedbackPage}>Back to Share Feedback</Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound
