import { useState } from "react"
import { Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'; 
import CardRopa from '../CardRopa/CardRopa';
import data from '../../../data.json';


const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredData);
  };

  return (
    <>
    <Form className="d-flex">
        <FormControl
            type="search"
            placeholder="Buscar"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
            value={searchTerm}
        />
    </Form>
        <CardRopa data={filteredData} />

        </>
  )
}

SearchBar.propTypes = {
    onSearch: PropTypes.array.isRequired,
  };

export default SearchBar
