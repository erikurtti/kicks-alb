import React, { useState } from 'react'
import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import ShoeDisplay from '../../components/ShoeDisplay/ShoeDisplay'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <>
      <br />
      <br />
      <br />
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <ShoeDisplay category={category} />
      <AppDownload />
    </>
  )
}

export default Home
