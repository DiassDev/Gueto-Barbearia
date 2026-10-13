import './NavBar.css';
import CtaButton from './CtaButton';

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
                <CtaButton
                 text='Agendar meu horário'
                 />
            </header>
        </>
    )
}

export default NavBar;