import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Team from './pages/Team';
import OrganizationsUganda from './pages/OrganizationsUganda';
import TeamMember from './pages/TeamMember';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

/**
 * Everything inside the router. Kept separate from <App> so the build-time
 * prerenderer can mount the identical tree inside a MemoryRouter — the static
 * HTML then contains the real header, navigation, page content and footer,
 * which is both what crawlers read and how they discover internal links.
 */
export function AppShell() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <Breadcrumb />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        role="main"
        id="main-content"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/mental-health-organizations-uganda" element={<OrganizationsUganda />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:slug" element={<TeamMember />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
