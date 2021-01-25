/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import { useState } from "react"

const Layout = ({ children }) => {
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(0)
  const [currYear, setCurrYear] = useState(2020)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const calc_current_year_day = curr_day => {
    const start = new Date(2021, 0, 1, 0, 0, 0, 0)
    const start_year = 2020
    setDay(curr_day)
    const curr_date = new Date(2021, month, curr_day, 0, 0, 0, 0)

    const diff = Math.round(
      (curr_date.getTime() - start.getTime()) / (1000 * 3600 * 24)
    )
    console.log(diff)

    const curr_year = start_year - Math.floor(diff / 2)
    setCurrYear(curr_year)
  }

  const calc_current_year_month = curr_month => {
    const start = new Date(2021, 0, 1, 0, 0, 0, 0)
    const start_year = 2020
    setMonth(curr_month)

    const curr_date = new Date(2021, curr_month, day, 0, 0, 0, 0)

    const diff = Math.round(
      (curr_date.getTime() - start.getTime()) / (1000 * 3600 * 24)
    )
    console.log(diff)

    const curr_year = start_year - Math.floor(diff / 2)
    setCurrYear(curr_year)
  }

  const calc_year = () => {
    const curr_date = new Date()
    const start = new Date(2021, 0, 1, 0, 0, 0, 0)
    const start_year = 2020

    const diff = (curr_date.getTime() - start.getTime()) / (1000 * 3600 * 24)

    const curr_year = start_year - Math.floor(diff / 2)

    return curr_year
  }

  return (
    <>
      <Header siteTitle={"Timebeat Helper"} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <div>
          <h2>
            Idag är det <strong>{calc_year()}</strong> som gäller.
          </h2>
          <hr />
          <h4>Välj datum för att se vilket år som gäller då:</h4>
          <form>
            <select
              name="month"
              onChange={e => calc_current_year_month(e.target.value)}
            >
              <option value={0}>Januari</option>
              <option value={1}>Februari</option>
              <option value={2}>Mars</option>
              <option value={3}>April</option>
              <option value={4}>Maj</option>
              <option value={5}>Juni</option>
              <option value={6}>Juli</option>
              <option value={7}>Augusti</option>
              <option value={8}>September</option>
              <option value={9}>Oktober</option>
              <option value={10}>November</option>
              <option value={11}>December</option>
            </select>
            <select
              name="day"
              onChange={e => calc_current_year_day(e.target.value)}
            >
              {[
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
              ].map(i => (
                <option value={i}>{i}</option>
              ))}
            </select>
          </form>
        </div>
        <h1>{currYear}</h1>
        <hr />

        <a href="http://sortyourmusic.playlistmachinery.com/" target="_blank">
          <h3>Sortera dina spellistor efter årtal</h3>
        </a>
        <hr />
        <iframe
          src="https://open.spotify.com/embed/playlist/5AfLeoDRHCPw5UvUpdUdVM"
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
