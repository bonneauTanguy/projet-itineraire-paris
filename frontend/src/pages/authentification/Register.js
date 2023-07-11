// Importations React
import React from 'react';

// Importation du css
import '../../css/Authentication.css';

// Autres importations
import { itineraireparisApiService } from '../../services/itineraireparisApiService';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pseudo: null,
            password: null,
            confirmPwd: null,
            error: null
        }
    }
    
    render() {
        return (
            <main className='mainAuth'>
                <h1>Inscription</h1>

                <form className='formAuth' onSubmit={this.register}>
                    <p>{this.state.error}</p>

                    <input
                        type='text'
                        id='text'
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
                        type='password'
                        id='confirmPwd'
                        placeholder='Confirmer le mot de passe'
                        className={this.state.error !== null && 'colorError'}
                        onChange={element => this.setState({ confirmPwd: element.target.value })}
                    />

                    <input
                        type='submit'
                        value='Inscription'
                    />
                </form>
            </main>
        );
    }

    // Fonction pour s'inscrire
    register = async (e) => {
        e.preventDefault();

        try {
            if (this.state.password !== this.state.confirmPwd) {
                this.setState({
                    error: "Le mot de passe confirmé ne correspond pas au mot de passe."
                })
            } else {
                let register = await itineraireparisApiService.request({
                    url: '/register',
                    method: 'PUT',
                    data: {
                        "pseudo": this.state.pseudo,
                        "password": this.state.password,
                        "confirmPwd": this.state.confirmPwd
                    }
                });

                if (register.data.result) {
                    sessionStorage.setItem('pseudo', this.state.pseudo);
                    sessionStorage.setItem('admin', false);

                    window.location.reload(true);
                    window.location.pathname ='/home';
                } else {
                    throw new Error();
                }
            }
        } catch (error) {
            this.setState({
                error: "Les champs doivent être remplis."
            });
            console.log(error);
        }
    }
}