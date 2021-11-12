import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './questions.module.css'
import { QuestionContext, QuestionT } from '../../context/QuestionProvider'
import Question from '../../components/Question'
import { Link, useHistory, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import User from '../../components/User'
import {
  DispatchReviewerContext,
  FeedbackItemT,
  FeedbackT,
  ReviewerContext,
  ReviewItemPayloadT,
} from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'
import Button from '../../components/Button'
import { getFeedbacks } from '../../common/util'

const Questions = () => {
  const currentUser = React.useContext(AccountContext)
  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const reviewDispatch = React.useContext(DispatchReviewerContext)
  const reviews = React.useContext(ReviewerContext)
  const feedbacks = getFeedbacks(reviews, currentUser)
  const [showAppreciation, setshowAppreciation] = React.useState<boolean>(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const [answers, setAnswers] = React.useState<
    {
      question: QuestionT
      feedback: string | number
      skipped: boolean
    }[]
  >([])

  const history = useHistory()
  const { userId } = useParams<{ userId: string }>()
  const user = users?.find((user) => user.id === userId)

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

    const updatedAnswers = answerExists
      ? answers.map((answer) =>
          answer.question.id === question.id ? newAnswer : answer,
        )
      : [...answers, newAnswer]

    setAnswers(updatedAnswers)
    if (currentQuestionIndex + 1 === questions?.length) {
      saveAnswer(updatedAnswers)
    } else {
      handleGoToNextQuestion()
    }
  }

  const saveAnswer = (updatedAnswers: FeedbackItemT[]) => {
    const feedback: FeedbackT = {
      user: user,
      feedback: updatedAnswers,
    }
    const review: ReviewItemPayloadT = {
      user: feedback.user,
      feedbacks: {
        reviewer: currentUser,
        feedbacks: feedback.feedback,
      },
    }
    reviewDispatch({
      action: 'review',
      payload: review,
    })
    setshowAppreciation(true)
  }

  const goToUserFeedback = (userId: string | undefined) => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    history.push(`/questions/${userId}`)
    setshowAppreciation(false)
  }

  const goToFeedbacksPage = () => {
    history.push('/my-feedback')
  }

  const pendingUsers = users?.filter(
    (user) =>
      user.id !== currentUser?.id &&
      !feedbacks.some((feedback) => feedback.reviewer?.id === user.id),
  )

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
                  key={`${Math.random}${question.id}`}
                  question={question}
                  currentQuestionIndex={currentQuestionIndex}
                  questionsLength={questions.length}
                  handleAnswerChange={handleAnswerChange}
                  handleGoToPreviousQuestion={handleGoToPreviousQuestion}
                />
              )
            )
          })}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <h1>Thank you for sharing your feedback</h1>
          {pendingUsers && pendingUsers?.length > 0 ? (
            <>
              <p>Continue to give feedback to other members</p>
              {users && users.length > 0 && (
                <ul className={styles.users}>
                  {pendingUsers?.map((user) => (
                    <li
                      key={`${Math.random}${user.id}`}
                      className={styles.user}
                    >
                      <User name={user.name} avatarUrl={user.avatarUrl} />
                      <span style={{ flex: 1 }} />
                      <Button onClick={() => goToUserFeedback(user.id)}>
                        Fill out
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div>
              <p> All User Reviewed</p>
              <Button onClick={goToFeedbacksPage}>View Feedbacks</Button>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  )
}

export default Questions
