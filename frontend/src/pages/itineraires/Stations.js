// Importations React
import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Importation des components
import Card from '../../components/Card';

// Importation du css
import '../../css/Itineraires.css';

export default class Stations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: [48.8643713, 2.3300615],
            stations: []
        }
    }

    componentDidMount() {
        this.getStations();
    }

    render() {
        return (
            <main>
                <h1>Stations Vélib</h1>

                <div className='divItineraire'>
                    <MapContainer
                        center={this.state.position}
                        zoom={11}
                        maxZoom={19}
                        style={{ height: 400, width: '50%' }}
                    >
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        {this.state.stations.map((station) => (
                            <Marker
                                key={station.recordid}
                                position={[
                                    station.geometry.coordinates[1],
                                    station.geometry.coordinates[0]
                                ]}
                            >
                                <Popup>{station.fields.name}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    <div className='listItineraire'>
                        {this.state.stations.map((station) => (
                            <Card key={station.recordid} station={station} />
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    // Fonction pour récupérer la liste des stations disponibles
    getStations = async () => {
        try {
            const URL = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes`;

            axios.get(URL).then(response => {
                const stations = response.data.records;
                
                this.setState({
                    stations: stations
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}