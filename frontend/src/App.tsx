import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import InfiniteCarousel from './components/InfiniteCarousel'
import Manifest from './components/Manifest'

function App() {

  return (
    <>
    <header>
      <NavBar />
    </header>
    <main>
      <section id='heroSection'>
        <Hero />
      </section>
      <section id='carouselSection'>
        <InfiniteCarousel
        items={['tranças', 'dreads', 'locs', 'cortes', 'manutenção']}
        title='O gueto oferece'
        speed={50}
        direction='right'
        pauseOnHover={false}
        fade={true}
         />
      </section>
      <section id='manifest'>
        <Manifest />
      </section>
    </main>    
    </>
  )
}

export default App
