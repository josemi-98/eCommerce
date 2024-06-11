import './CardRopa.css'
import PropTypes from 'prop-types'; 

const CardRopa = ({data}) => {
  return (
      <div className="card-grid">
        {data.map(item => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <p className="card-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
  )
}

CardRopa.propTypes = {
    data: PropTypes.array.isRequired,
  };

export default CardRopa
