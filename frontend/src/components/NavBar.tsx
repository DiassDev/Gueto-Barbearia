import './NavBar.css';


function NavBar() {

    return (
        <>
            <header className='navigationContainer'>
                <div className='navLogo'></div>
                <nav className='navBarElements'>
                    <a>Home</a>
                    <a>Serviços</a>
                    <a>Sobre</a>
                    <a>Agenda</a>
                </nav>
                <button className='navigationCta'>Agendar meu horário</button>
            </header>
        </>
    )
}

export default NavBar;