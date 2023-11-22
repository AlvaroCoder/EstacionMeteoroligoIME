import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Infographic from "./Components/Infographic";
import Metrics from "./Components/Metrics";
import NavBar from "./Components/NavBar";
import PredictionMetrics from "./Components/PredictionMetrics";

function App() {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <Metrics/>
      <PredictionMetrics/>
      <Infographic/>
      <Footer/>
    </div>
  );
}

export default App;
