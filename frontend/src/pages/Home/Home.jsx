import TelegramHero from '../../components/TelegramHero/TelegramHero'
import SalesIssues from '../../components/SalesIssues/SalesIssues'
import TelegramChannel from '../../components/TelegramChannel/TelegramChannel'
import BusinessFit from '../../components/BusinessFit/BusinessFit'
import CompanyMarquee from '../../components/CompanyMarquee/CompanyMarquee'
import LeadCapture from '../../components/LeadCapture/LeadCapture'
import Faq from '../../components/Faq/Faq'
import Footer from '../../components/Footer/Footer'
import './Home.scss'

export default function Home() {
  return (
    <main className="home">
      <TelegramHero />
      <SalesIssues />
      <TelegramChannel />
      <BusinessFit />
      <CompanyMarquee />
      <LeadCapture />
      <Faq />
      <Footer />
    </main>
  )
}
