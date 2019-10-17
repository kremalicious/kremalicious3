import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'
import IconLinks from './IconLinks'
import styles from './Vcard.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'

export function VcardPure({
  avatar,
  uri,
  name,
  links
}: {
  avatar: FixedObject
  uri: string
  name: string
  links: string[]
}) {
  return (
    <div className={styles.vcard}>
      <Img className={styles.avatar} fixed={avatar} alt="avatar" />
      <p className={styles.description}>
        Blog of designer &amp; developer{' '}
        <a className="fn" rel="author" href={uri}>
          {name}
        </a>
      </p>

      <IconLinks links={links} />
    </div>
  )
}

export default function Vcard() {
  const query = graphql`
    query {
      avatar: allFile(filter: { name: { eq: "avatar" } }) {
        edges {
          node {
            childImageSharp {
              fixed(width: 80, height: 80, quality: 90) {
                ...GatsbyImageSharpFixed_withWebp_noBase64
              }
            }
          }
        }
      }
    }
  `

  const data = useStaticQuery(query)
  const { author, rss, jsonfeed } = useSiteMetadata()
  const { twitter, github, name, uri } = author
  const avatar = data.avatar.edges[0].node.childImageSharp.fixed
  const links = [twitter, github, rss, jsonfeed]

  return <VcardPure avatar={avatar} links={links} uri={uri} name={name} />
}