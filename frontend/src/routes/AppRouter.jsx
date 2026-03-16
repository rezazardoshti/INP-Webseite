import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Projects from '../pages/Projects'
import Reviews from '../pages/Reviews'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'
import ServiceDetail from '../pages/ServiceDetail'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="ueber-uns" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projekte" element={<Projects />} />
        <Route path="bewertungen" element={<Reviews />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
      </Route>
    </Routes>
  )
}

export default AppRouter