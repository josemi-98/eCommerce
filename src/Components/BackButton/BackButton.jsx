import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div>
        <Link to={"/"} style={{ textDecoration: 'none' }}>Volver </Link>
    </div>
  )
}

export default BackButton
