import ferritoLogo from "./assets/logoferrito.png";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h2>New</h2>
        <img src={ferritoLogo} className="logo" alt="ferrito" />
        <h1>OBREROS TRABAJANDO</h1>
        <h3>Proximamente en Ecuador 2025</h3>
      </div>
    </>
  );
}

export default App;
