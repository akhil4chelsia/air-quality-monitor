import Header from "./layout/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AirQualityProvider } from "./AirQualityProvider";
function App() {
  return (
    <div className="App">
      <AirQualityProvider>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </AirQualityProvider>
    </div>
  );
}

export default App;
