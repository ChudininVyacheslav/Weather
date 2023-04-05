import './reset.css';
import './App.css';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
const divNode = document.getElementById('app');

function App() {

  return (
    <div id='app' className="app">
      <Header />
      <Info />
    </div>
  );
}

export default App;



// document.getElementById('a').style.backgroundImage="url(images/img.jpg)";  изменить background-image