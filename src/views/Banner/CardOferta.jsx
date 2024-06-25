import useAuth from '../../Hooks/useAuth';
import './CardOferta.css';

const CardOferta = () => {

  const { isLoggedIn, userData } = useAuth();

  return (
    <div className="discount-card">
      {isLoggedIn ? (
        <p className="offer-text">
          ¡{userData.name}, aprovéchate de tu 20% de descuento!
        </p>
      ) : (
        <p className="offer-text">
          Crea una cuenta para disfrutar de los descuentos
        </p>
      )}
    </div>
  );
};


export default CardOferta;
