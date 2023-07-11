// Importation React
import { Link } from 'react-router-dom';

// Importation du css
import '../css/Card.css';

const Card = ({ station }) => {
    return (
        <div className='divCard'>
            <div>
                <h2>{station.fields.name}</h2>
                <p>n°{station.fields.stationcode}</p>
            </div>

            <p>
                <b>Capacité de la station :</b> {station.fields.capacity}<br />
                <b>Nombre de vélos disponibles :</b> {station.fields.numbikesavailable}<br />
                <b>Nombre de bornettes disponibles :</b> {station.fields.numdocksavailable}
            </p>
        </div>
    );
}

export default Card;