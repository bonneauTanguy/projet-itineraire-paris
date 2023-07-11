// Importations React
import React from 'react';

// Importation du css
import '../../css/Authentication.css';

// Autres importations
import { itineraireparisApiService } from '../../services/itineraireparisApiService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: null,
            password: null,
            error: null
        }
    }

    render() {
        return (
            <main className='mainAuth'>
                <h1>Connexion</h1>

                <form className='formAuth' onSubmit={this.login}>
                    <p>{this.state.error}</p>

                    <input
                        type='text'
                        id='pseudo'
                        placeholder='Pseudonyme'
                        className={this.state.error !== null && 'colorError'}
                        onChange={element => this.setState({ pseudo: element.target.value })}
                    />

                    <input
                        type='password'
                        id='password'
                        placeholder='Mot de passe'
                        className={this.state.error !== null && 'colorError'}
                        onChange={element => this.setState({ password: element.target.value })}
                    />

                    <input
                        type='submit'
                        value='Connexion'
                    />
                </form>
            </main>
        );
    }

    // Fonction pour se connecter
    login = async (e) => {
        e.preventDefault();

        try {
            let login = await itineraireparisApiService.request({
                url: '/signin',
                method: 'POST',
                data: {
                    "pseudo": this.state.pseudo,
                    "password": this.state.password
                }
            });

            if (login.data.result) {
                let infos = await itineraireparisApiService.request({
                    url: '/userInfo',
                    method: 'GET'
                });

                if (infos.statusText === 'OK') {
                    sessionStorage.setItem('id', infos.data.id);
                    sessionStorage.setItem('pseudo', infos.data.pseudo);
                    sessionStorage.setItem('admin', infos.data.admin);
                    sessionStorage.setItem('token', infos.data.token);
                } else {
                    throw new Error();
                }

                window.location.reload(true);
                window.location.pathname = '/home';
            } else {
                throw new Error();
            }
        } catch(error) {
            if (error.response.status === 401) {
                this.setState({
                    error: "Identifiants incorrects."
                });
            } else {
                this.setState({
                    error: "Les champs doivent être remplis."
                });
                console.log(error);
            }
        }
    }
}