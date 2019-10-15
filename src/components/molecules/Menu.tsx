import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import Hamburger from '../atoms/Hamburger'
import styles from './Menu.module.scss'
import { useSiteMetadata } from '../../hooks/use-site-metadata'
import { MenuItem } from '../../@types/SiteMetadata'

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { menu } = useSiteMetadata()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const MenuItems = menu.map((item: MenuItem) => (
    <li key={item.title}>
      <Link onClick={toggleMenu} to={item.link}>
        {item.title}
      </Link>
    </li>
  ))

  return (
    <>
      <Helmet>
        <html className={menuOpen ? 'has-menu-open' : null} lang="en" />
      </Helmet>
      <Hamburger onClick={toggleMenu} />
      <ul className={styles.menu}>{MenuItems}</ul>
    </>
  )
}
