import { MouseTrail } from './components/mouse-trail';
import { NavBar } from './components/nav-bar';
import { ScrollBar } from './components/scroll-bar';
import { AboutMe } from './sections/about-me.section';
import { Contact } from './sections/contact.section';
import { InfoSection } from './sections/info.section';
import { Projects } from './sections/projects.section';
import { TechStack } from './sections/tech-stack.section';

import './styles/about-me.css';
import './styles/contact.css';
import './styles/floating-button.css';
import './styles/glow-box.css';
import './styles/info-section.css';
import './styles/mouse-trail.css';
import './styles/nav-bar.css';
import './styles/projects.css';
import './styles/tech-stack.css';
import './styles/text-hover.css';
import './styles/title.css';

function App() {
  return (
    <>
      <NavBar />
      <ScrollBar />
      <MouseTrail />
      <InfoSection />
      <AboutMe />
      <TechStack />
      <Projects />
      <Contact />
    </>
  );
}

export default App;