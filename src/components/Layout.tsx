import React, { ReactElement } from 'react'
import Typekit from './atoms/Typekit'
import Header from './organisms/Header'
import Footer from './organisms/Footer'
import { document, content } from './Layout.module.css'

// if (process.env.NODE_ENV !== 'production') {
//   // eslint-disable-next-line
//   const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js')
//   whyDidYouRender(React)
// }

export default function Layout({ children }: { children: any }): ReactElement {
  return (
    <>
      <Typekit />
      <Header />

      <main className={document} id="document">
        <div className={content}>{children}</div>
      </main>

      <Footer />
    </>
  )
}
