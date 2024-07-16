import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filtro, setFiltro] = useState("");

    return (
        <FilterContext.Provider value={{ filtro, setFiltro }}>
            {children}
        </FilterContext.Provider>
    );
};

FilterProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
