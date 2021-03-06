import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import { graphql, useStaticQuery } from 'gatsby'
import PostTeaser from '../PostTeaser'
import SearchResultsEmpty from './SearchResultsEmpty'
import * as styles from './SearchResults.module.css'
import { Post } from '../../../@types/Post'

export interface Results {
  slug: string
}

const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          ...PostTeaser
        }
      }
    }
  }
`

function SearchResultsPure({
  searchQuery,
  results,
  toggleSearch,
  posts
}: {
  posts: [{ node: Post }]
  searchQuery: string
  results: Results[]
  toggleSearch(): void
}) {
  return (
    <div className={styles.searchResults}>
      {results.length > 0 ? (
        <ul className={styles.results}>
          {results.map((page: { slug: string }) =>
            posts
              .filter(
                ({ node }: { node: Post }) => node.fields.slug === page.slug
              )
              .map(({ node }: { node: Post }) => (
                <li key={page.slug}>
                  <PostTeaser post={node} toggleSearch={toggleSearch} />
                </li>
              ))
          )}
        </ul>
      ) : (
        <SearchResultsEmpty searchQuery={searchQuery} results={results} />
      )}
    </div>
  )
}

export default function SearchResults({
  searchQuery,
  results,
  toggleSearch
}: {
  searchQuery: string
  results: Results[]
  toggleSearch(): void
}): ReactElement {
  const data = useStaticQuery(query)
  const posts = data.allMarkdownRemark.edges

  // creating portal to break out of DOM node we're in
  // and render the results in content container
  return ReactDOM.createPortal(
    <SearchResultsPure
      posts={posts}
      results={results}
      searchQuery={searchQuery}
      toggleSearch={toggleSearch}
    />,
    document.getElementById('document')
  )
}
