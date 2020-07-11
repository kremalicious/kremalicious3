import React, { ReactElement } from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import Page from '../components/templates/Page'
import { Post } from '../@types/Post'
import { Image } from '../components/atoms/Image'
import styles from './photos.module.scss'

const page = {
  frontmatter: {
    title: 'Photos',
    description: 'Personal photos of designer & developer Matthias Kretschmann.'
  }
}

const PhotoThumb = ({ photo }: { photo: Post }): ReactElement => {
  const { title, image } = photo.frontmatter
  const { slug } = photo.fields
  const { fluid } = image.childImageSharp

  return (
    <article className={styles.photo}>
      {image && (
        <Link to={slug}>
          <Image title={title} fluid={fluid} alt={title} />
        </Link>
      )}
    </article>
  )
}

export default function Photos(props: PageProps): ReactElement {
  return (
    <Page title={page.frontmatter.title} post={page} section={styles.photos}>
      {(props.data as any).photos.edges.map(({ node }: { node: Post }) => (
        <PhotoThumb key={node.id} photo={node} />
      ))}
    </Page>
  )
}

export const photosQuery = graphql`
  query {
    photos: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "photo" } } }
      sort: { order: DESC, fields: [fields___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            type
            image {
              childImageSharp {
                fluid(
                  maxWidth: 400
                  maxHeight: 400
                  quality: 85
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
