import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import { useContext } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';

const Footer = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <footer className={`footer ${theme}`}>
            <div className="footer__container">
                <div className="footer__column">
                    <h3>Contacto</h3>
                    <ul>
                        <li><FontAwesomeIcon icon={faEnvelope} /> tuTienda@gmail.com</li>
                        <li><FontAwesomeIcon icon={faPhone} /> +34689789423</li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h3>Redes Sociales</h3>
                    <ul>
                        <li><a href="#"><FontAwesomeIcon icon={['fab', 'facebook']} /> Facebook</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={['fab', 'twitter']} /> Twitter</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={['fab', 'instagram']} /> Instagram</a></li>
                    </ul>
                </div>
                <div className="footer__column">
                    <h3>Dirección</h3>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Calle correderas, Jaen, España</p>
                </div>
            </div>
            <hr className="footer__line" />
            <p className="footer__copyright">
                &copy; 2024 Tu Empresa. Todos los derechos reservados.
            </p>
        </footer>
    );
}

export default Footer;
