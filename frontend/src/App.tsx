import './App.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

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
    </main>    
    </>
  )
}

export default App
