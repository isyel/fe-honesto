import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './questions.module.css'
import { QuestionContext, QuestionT } from '../../context/QuestionProvider'
import Question from '../../components/Question'
import {
  DispatchFeedbackContext,
  FeedbackContext,
  FeedbackT,
} from '../../context/FeedbackProvider'
import { Link, useHistory, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import User from '../../components/User'
import {
  DispatchReviewerContext,
  ReviewsT,
} from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import Button from '../../components/Button'

const Questions = () => {
  const currentUser = React.useContext(AccountContext)
  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)
  const reviewDispatch = React.useContext(DispatchReviewerContext)
  const feedbacks = React.useContext(FeedbackContext)
  // const reviews = React.useContext(ReviewerContext)
  const [showAppreciation, setshowAppreciation] = React.useState(false)
  const history = useHistory()

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const { userId } = useParams<{ userId: string }>()
  const user = users?.find((user) => user.id === userId)
  const [answers, setAnswers] = React.useState<
    {
      question: QuestionT
      feedback: string | number
      skipped: boolean
    }[]
  >([])

  const handleGoToNextQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex + 1 < questions?.length
        ? currentQuestionIndex + 1
        : currentQuestionIndex,
    )
  }

  const handleGoToPreviousQuestion = () => {
    setCurrentQuestionIndex((currentQuestionIndex) =>
      currentQuestionIndex > 0
        ? currentQuestionIndex - 1
        : currentQuestionIndex,
    )
  }

  const handleAnswerChange = (question: any, skipped: boolean, answer: any) => {
    const answerExists = answers.some(
      (answer) => answer.question.id === question.id,
    )
    const newAnswer = {
      question,
      feedback: answer,
      skipped,
    }
    setAnswers((answers) =>
      answerExists
        ? answers.map((answer) =>
            answer.question.id === question.id ? newAnswer : answer,
          )
        : [...answers, newAnswer],
    )
  }

  React.useEffect(() => {
    if (currentQuestionIndex + 1 === questions?.length) {
      saveAnswer()
    } else {
      handleGoToNextQuestion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  const saveAnswer = () => {
    const feedback: FeedbackT = {
      user: user,
      feedback: answers,
    }
    const review: ReviewsT = {
      reviewer: currentUser,
      user: feedback.user,
      feedbacks: feedback.feedback,
    }
    feedbackDispatch({
      action: 'feedback',
      payload: feedback,
    })
    reviewDispatch({
      action: 'review',
      payload: review,
    })
    setshowAppreciation(true)
  }

  const goToUserFeedback = (userId: string | undefined) => {
    setshowAppreciation(false)
    history.push(`/questions/${userId}`)
  }

  return (
    <MainLayout loggedIn>
      {!showAppreciation ? (
        <div className={styles.wrapper}>
          <Link to="/share-feedback" className={styles.back}>
            <ArrowBackIosIcon /> Back
          </Link>
          <section className={styles.textSection}>
            <div>
              {questions && <h2>{questions[currentQuestionIndex].label}</h2>}
              <span>Share your feedback with {user?.name || 'No User'}</span>
            </div>
            <User avatarUrl={user?.avatarUrl} />
          </section>
          {questions.map((question, index) => {
            return (
              index === currentQuestionIndex && (
                <Question
                  answers={answers}
                  key={question.id}
                  question={question}
                  currentQuestionIndex={currentQuestionIndex}
                  questionsLength={questions.length}
                  handleAnswerChange={handleAnswerChange}
                  saveAnswer={saveAnswer}
                  handleGoToPreviousQuestion={handleGoToPreviousQuestion}
                />
              )
            )
          })}
        </div>
      ) : (
        <div>
          <h1>Thank you for sharing your feedback</h1>
          <p>Continue to give feedback to other members</p>
          {users && users.length > 0 && (
            <ul className={styles.users}>
              {users
                .filter(
                  (user) =>
                    user.id !== currentUser?.id &&
                    !feedbacks.some(
                      (feedback) => feedback.user?.id === user.id,
                    ),
                )
                .map((user) => (
                  <li key={user.id} className={styles.user}>
                    <User name={user.name} avatarUrl={user.avatarUrl} />
                    <span style={{ flex: 1 }} />
                    <Button onClick={() => goToUserFeedback(user.id)}>
                      Fill out
                    </Button>
                    <Link to="/components">Go to component</Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </MainLayout>
  )
}

export default Questions
