// Importations React
import React from 'react';

// Importation du css
import '../../css/Authentication.css';

// Autres importations
import { itineraireparisApiService } from '../../services/itineraireparisApiService';

export default class Logout extends React.Component {
    async componentDidMount() {
        // Fonction pour se déconnecter
        try {
            let logout = await itineraireparisApiService.request({
                url: '/logout',
                method: 'GET'
            });

            if (logout.data.result) {
                sessionStorage.clear();
                window.location.reload(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <main className='mainAuth'>
                <h1>Déconnexion</h1>

                <p>Vous êtes maintenant déconnecté.</p>
            </main>
        );
    }
}