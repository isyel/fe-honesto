import * as React from 'react'
import classnames from 'classnames'
import Content from '../Content'
import Footer from '../Footer'
import Header from '../Header'
import styles from './mainLayout.module.css'

type Props = {
  children: React.ReactNode
  loggedIn?: boolean
  className?: string
  noPadding?: boolean
}

const MainLayout = ({ children, loggedIn, className, noPadding }: Props) => {
  const [darkTheme, setDarkTheme] = React.useState(false)

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <div
      className={classnames(
        styles.mainLayout,
        className,
        {
          [styles.loggedIn]: loggedIn,
        },
        darkTheme ? styles.darkTheme : styles.lightTheme,
      )}
    >
      {loggedIn && (
        <Header handleThemeChange={handleThemeChange} darkTheme={darkTheme} />
      )}
      <Content noPadding={noPadding}>{children}</Content>
      <Footer />
    </div>
  )
}

export default MainLayout
