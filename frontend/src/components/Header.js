// Importation React
import { Link } from 'react-router-dom';

// Importation du css
import '../css/Header.css';

// Importation logo

const Header = () => {
    const user_id = sessionStorage.getItem('id');
    const user_pseudo = sessionStorage.getItem('pseudo');
    const user_token = sessionStorage.getItem('token');

    return (
        <header>
            <Link className='liens' to='/home'>
                <h1>Itinéraire Paris</h1>
            </Link>

            <nav>
                {(user_id && user_pseudo && user_token)
                    ?
                    <>
                        <Link className='liens' to='/profile'>Profil</Link>
                        <Link className='liens' to='/logout'>Déconnexion</Link>
                    </>
                    :
                    <>
                        <Link className='liens' to='/login'>Connexion</Link>
                        <Link className='liens' to='/register'>Inscription</Link>
                    </>
                }
            </nav>
        </header>
    );
}

export default Header;