import './CardOferta.css';
import PropTypes from "prop-types";

const CardOferta = ({ isLoggedIn, name }) => {
  return (
    <div className="discount-card">
      {isLoggedIn ? (
        <p className="offer-text">
          ¡{name}, aprovéchate de tu 20% de descuento!
        </p>
      ) : (
        <p className="offer-text">
          Crea una cuenta para disfrutar de los descuentos
        </p>
      )}
    </div>
  );
};

CardOferta.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}

export default CardOferta;
