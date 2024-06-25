import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center">
                        <h1 className="display-4">404</h1>
                        <p className="lead">
                            La página que buscas no fue encontrada.
                        </p>
                        <Link to="/" className=" mt-3" style={{ textDecoration: 'none' }}>
                            Volver a la página principal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
