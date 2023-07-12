// Importations React
import React from 'react';
import { Link } from 'react-router-dom';

// Importations des components

// Importation du css
import '../css/Home.css';

// Autres importations
import { itineraireparisApiService } from '../services/itineraireparisApiService';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: sessionStorage.getItem('id'),
            itinerairesByUser: []
        }
    }

    componentDidMount() {
        this.getItinerairesByUser();
    }

    render() {
        return (
            <main>
                <Link className='buttonItineraire' to={{ pathname: '/create-itineraire' }}>
                    <button>+ Créer un itinéraire</button>
                </Link>

                <h1>Liste des itinéraires :</h1>

                {/* À modifier plus tard en tableau plutôt que liste
                pour pouvoir cliquer sur l'itinéraire (afficher), et
                les boutons d'action : éditer / supprimer */}
                <ul>
                    {this.state.itinerairesByUser.length > 0 ?
                        this.state.itinerairesByUser.map((itineraire, index) =>
                        <li key={index}>
                            Itinéraire {itineraire.depart} - {itineraire.arrivee}, créé le {itineraire.createdAt}
                        </li>
                        )
                        :
                        <p>Aucun itinéraire.</p>
                    }
                </ul>
            </main>
        );
    }

    // Fonction pour récupérer la liste des itinéraires de l'utilisateur connecté
    getItinerairesByUser = async () => {
        try {
            const URL = `/itineraires/user/${this.state.userId}`;

            const itinerairesByUser = await itineraireparisApiService.request({
                url: URL,
                method: 'GET'
            });

            if (itinerairesByUser.data.result) {
                this.setState({ itinerairesByUser: itinerairesByUser.data.result });
            } else {
                console.log('Erreur');
            }
        } catch (error) {
            console.log(error);
        }
    }
}