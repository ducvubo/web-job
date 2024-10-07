import React from 'react'
import Header from './components/home/Header'
import Banner from './components/home/Banner'
import JobBest from './components/home/Jobbest'
import CompanyOutstanding from './components/home/CompanyOutstanding'
import Market from './components/home/Market'
import OutstandingEmployer from './components/home/OutstandingEmployer'
import TopCareer from './components/home/TopCareer'
import TrademarkSelf from './components/home/TrademarkSelf'
import FeaturedTools from './components/home/FeaturedTools'
import AchievementAward from './components/home/AchievementAward'
import DownloadApp from './components/home/DownloadApp'
import Achievement from './components/home/Achievement'
import Footer from './components/home/Footer'
import TopSearch from './components/home/TopSearch'

export default function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <JobBest />
      <CompanyOutstanding />
      <Market />
      <OutstandingEmployer />
      <TopCareer />
      <TrademarkSelf />
      <FeaturedTools />
      <AchievementAward />
      <DownloadApp />
      <Achievement />
      <TopSearch />
      <Footer />
    </React.Fragment>
  )
}
