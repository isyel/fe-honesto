import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './questions.module.css'
import { QuestionContext, QuestionT } from '../../context/QuestionProvider'
import Question from '../../components/Question'
import {
  DispatchFeedbackContext,
  FeedbackT,
} from '../../context/FeedbackProvider'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import User from '../../components/User'
import {
  DispatchReviewerContext,
  ReviewsT,
} from '../../context/ReviewerProvider'
import { AccountContext } from '../../context/AccountProvider'

const Questions = () => {
  const currentUser = React.useContext(AccountContext)
  const users = React.useContext(UserContext)
  const questions = React.useContext(QuestionContext)
  const feedbackDispatch = React.useContext(DispatchFeedbackContext)
  const reviewDispatch = React.useContext(DispatchReviewerContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0)
  const { userId } = useParams<{ userId: string }>()
  const user = users?.find((user) => user.id === userId)
  const [answers, setAnswers] = React.useState<
    {
      question: QuestionT
      feedback: string | number
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

  const handleAnswerChange = (question: any, answer: any) => {
    const answerExists = answers.some(
      (answer) => answer.question.id === question.id,
    )
    const newAnswer = {
      question,
      feedback: answer,
    }
    setAnswers((answers) =>
      answerExists
        ? answers.map((answer) =>
            answer.question.id === question.id ? newAnswer : answer,
          )
        : [...answers, newAnswer],
    )
    if (currentQuestionIndex + 1 === questions?.length) {
      saveAnswer()
    } else {
      handleGoToNextQuestion()
    }
  }

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
  }

  const goBack = () => {}

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <Link to="/share-feedback" className={styles.back} onClick={goBack}>
          <ArrowBackIosIcon /> Back
        </Link>
        <section className={styles.textSection}>
          <div>
            {questions && <h2>{questions[currentQuestionIndex].label}</h2>}
            <span>Share your feedback with {user?.name || 'No User'}</span>
          </div>
          <User avatarUrl={user?.avatarUrl} />
        </section>
        {questions.map((question, index) => (
          <>
            {index === currentQuestionIndex && (
              <Question
                question={question}
                currentQuestionIndex={currentQuestionIndex}
                questionsLength={questions.length}
                handleAnswerChange={handleAnswerChange}
                handleGoToNextQuestion={handleGoToNextQuestion}
                saveAnswer={saveAnswer}
                handleGoToPreviousQuestion={handleGoToPreviousQuestion}
              />
            )}
          </>
        ))}
      </div>
    </MainLayout>
  )
}

export default Questions
