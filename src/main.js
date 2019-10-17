import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Navbar from './components/navbar.js';

const main = document.querySelector('main');
const body = document.querySelector('body');

function onHashChange() {
  switch (window.location.hash) {
    case '#register':
      body.className = 'background';
      main.innerHTML = Register();
      break;
    case '#login':
      body.className = 'background';
      main.innerHTML = Login();
      break;
    case '#home':
      main.innerHTML = Home();
      body.insertBefore(Navbar(), main);
      break;
    default:
      '404 page not found';
  }
}

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.hash = '#home';
    } else {
      window.location.hash = '#login';
    }
  });
}

window.onhashchange = onHashChange;
window.addEventListener('load', init);
