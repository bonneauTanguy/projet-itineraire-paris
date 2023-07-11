// Importations React
import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Importations des components

// Importation du css
import '../../css/Itineraires.css';

// Autres importations
import { itineraireparisApiService } from '../../services/itineraireparisApiService';

export default class NewItineraire extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: [48.8643713, 2.3300615],
            velibs: [
                { id: 1, lat: 51.505, lng: -0.09, name: 'London' },
                { id: 2, lat: 48.8566, lng: 2.3522, name: 'Paris' },
                { id: 3, lat: 40.7128, lng: -74.006, name: 'New York' }
            ]
        }
    }

    componentDidMount() {
        // this.getVelib();
    }
    
    render() {
        return (
            <main>
                <h1>Créer un nouvel itinéraire</h1>

                <MapContainer
                    center={this.state.position}
                    zoom={11}
                    maxZoom={19}
                    style={{ height: 400, width: '100%' }}
                >
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                    {/* {this.state.velibs.map((velib) => (
                        <Marker key={velib.id} position={[velib.lat, velib.lng]}>
                            <Popup>{velib.name}</Popup>
                        </Marker>
                    ))} */}
                </MapContainer>
            </main>
        );
    }

    // Fonction pour récupérer la liste des vélib disponibles
    getVelib = async () => {
        try {
            const URL = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes`;

            axios.get(URL).then(res => {
                const velibs = res.data;
                
                this.setState({
                    velibs: velibs
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}