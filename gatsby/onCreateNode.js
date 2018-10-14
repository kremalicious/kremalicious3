const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create slug & date for posts from file path values
exports.createMarkdownFields = (node, createNodeField, getNode) => {
  const fileNode = getNode(node.parent)
  const parsedFilePath = path.parse(fileNode.relativePath)
  const slugOriginal = createFilePath({ node, getNode })

  // slug
  let slug

  if (parsedFilePath.name === 'index') {
    slug = `/${parsedFilePath.dir.substring(11)}` // remove date from file dir
  } else {
    slug = `/${slugOriginal.substring(12)}` // remove first slash & date from file path
  }

  createNodeField({
    node,
    name: 'slug',
    value: slug
  })

  // date
  let date

  if (node.frontmatter.date) {
    date = `${node.frontmatter.date}`
  } else {
    date = `${slugOriginal.substring(1, 10)}` // grab date from file path
  }

  createNodeField({
    node,
    name: 'date',
    value: date
  })
}
