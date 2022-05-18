import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import HeaderLayout from './components/layouts/header';
import FooterLayout from './components/layouts/footer';
import { Container, Divider } from 'semantic-ui-react';
import ItemList from './components/item-list';


function App() {
  return (
    <Router>
      <HeaderLayout />
      <Container style={{ minHeight: "60vh" }}>
        <Divider />
        <ItemList />
      </Container>
      <FooterLayout />
    </Router>
  );
}

export default App;