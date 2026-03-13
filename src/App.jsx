import Nav      from './components/Nav'
import Hero     from './components/Hero'
import Stats    from './components/Stats'
import Projects from './components/Projects'
import Blog     from './components/Blog'
import About    from './components/About'
import Contact  from './components/Contact'
import Footer   from './components/Footer'
import Cursor   from './components/Cursor'

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <div className="content-wrap">
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Blog />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
