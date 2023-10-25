import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Customers from "./components/pages/customers";
import Movies from "./components/pages/movies";
import Reports from "./components/pages/reports";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/movies":
      component = <Movies />;
      break;
    case "/customers":
      component = <Customers />;
      break;
    case "/reports":
      component = <Reports />;
      break;
  }
  return (
    <>
      <Navbar />
      {component}
    </>
  );
}

export default App;
