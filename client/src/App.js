import './App.css';
import { Countries } from './Components/Countries';
import { Route, Switch } from "react-router-dom";
import Nav from './Components/Nav';
import Homepage from './Components/Homepage';
import { CountryDetail } from './Components/CountryDetail';
import { Order } from './Components/Order';
import { AddActivity } from './Components/AddActivity';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home" >
          <Nav />
          <Order />
          <Countries />
        </Route>
        <Route path="/addactivity">
          <AddActivity />
        </Route>
        <Route path="/:id">
          <CountryDetail />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch> 
    </div>
  );
}

export default App;
