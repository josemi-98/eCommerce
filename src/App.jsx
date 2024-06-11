import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
// import CardRopa from './Components/CardRopa/CardRopa';
// import CardOferta from './Components/CardOfertas/CardOferta';
library.add(fas, far, fab);

function App() {

  return (
    <>
      <Header></Header>
      {/* <CardOferta></CardOferta> */}
      {/* <CardRopa></CardRopa> */}
      <Footer></Footer>
    </>
  )
}

export default App
