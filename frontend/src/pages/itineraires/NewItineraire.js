// Importations React
import React, { useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import jsPDF from 'jspdf';

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
            itineraire: [],
            depart: null,
            arrivee: null
        }
    }

    // Fonction qui récupère les coordonnées du click sur la map
    handleMapClick = (e) => {
        const { depart, arrivee } = this.state;

        if (!depart) {
            this.setState({
                depart: [e.latlng.lat, e.latlng.lng ]
            });
        } else if (!arrivee) {
            this.setState({
                arrivee: [e.latlng.lat, e.latlng.lng ]
            });
        }
    }

    // Fonction qui permet de déplacer le point de départ
    handleDepartMarkerDrag = (e) => {
        this.setState({
            depart: [e.target._latlng.lat, e.target._latlng.lng]
        });
    }

    // Fonction qui permet de déplacer le point d'arrivée
    handleArriveeMarkerDrag = (e) => {
        this.setState({
            arrivee: [e.target._latlng.lat, e.target._latlng.lng]
        });
    }

    // Fonction qui génère un PDF de l'itinéraire

    render() { 
        const { depart, arrivee } = this.state;
        
        return (
            <main>
                <h1>Créer un nouvel itinéraire</h1>

                <p>
                    Cliquez sur la carte pour choisir votre point de départ et d'arrivée.<br />
                    Vous pouvez déplacer les points en les glissant sur la map.<br />
                    Il est nécessaire de zoomer ou de dézoomer au moins une fois pour que l'itinéraire soit généré.
                </p>

                <MapContainer
                    center={this.state.position}
                    zoom={11}
                    maxZoom={19}
                    style={{ height: 400, width: '100%' }}
                >
                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                    <MapEventsHandler onClick={this.handleMapClick} />

                    {depart && (
                        <Marker
                            position={depart}
                            draggable={true}
                            onDragend={this.handleDepartMarkerDrag}
                        >
                            <Popup>Point de départ</Popup>
                        </Marker>
                    )}

                    {arrivee && (
                        <Marker
                            position={arrivee}
                            draggable={true}
                            onDragend={this.handleArriveeMarkerDrag}
                        >
                            <Popup>Point d'arrivée</Popup>
                        </Marker>
                    )}

                    {depart && arrivee && (
                        <Routing routeFrom={depart} routeTo={arrivee} />
                    )}
                </MapContainer>

                {/* <button onClick={this.handleGeneratePDF}>Générer le PDF de l'itinéraire</button> */}
            </main>
        );
    }
}

// Fonction qui provoque un click sur la map
const MapEventsHandler = ({ onClick }) => {
    useMapEvents({
        click: onClick
    });

    return null;
}

// Fonction qui génère le trajet entre le point de départ et le point d'arrivée
const Routing = ({ routeFrom, routeTo }) => {
    const map = useMapEvents({
        zoomend: () => {
            calculateRoute();
        }
    });

    useEffect(() => {
        calculateRoute();
    }, []);

    const calculateRoute = () => {
        if (routeFrom && routeTo) {
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(routeFrom[0], routeFrom[1]),
                    L.latLng(routeTo[0], routeTo[1])
                ]
            }).addTo(map);

            return () => {
                map.removeControl(control);
            }
        }
    }

    return null;
}