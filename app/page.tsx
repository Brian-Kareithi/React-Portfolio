
import Background from './components/DynamicBackground'
import Navbar from './components/NavBar'
import Main from './pages/page'
import About from './pages/aboutme'
import Projects from './pages/projects'
import Contact from './pages/contact'
import TechStack from './pages/techstack'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Background />
      <Navbar />
      <div className="relative z-10">
        <Main />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}