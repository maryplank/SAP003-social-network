import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Profile from './pages/profile.js';
import UpdateProfile from './pages/update-profile.js';

const main = document.querySelector('main');
const body = document.querySelector('body');

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      main.innerHTML = Home();
    } else {
      main.innerHTML = Login();
    }
  });
}

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
      break;
    case '#profile':
      main.innerHTML = Profile();
      break;
    case '#configuration':
      main.innerHTML = UpdateProfile();
      break;
    default:
      '404 page not found';
  }
}

window.onhashchange = onHashChange;
window.addEventListener('load', init);
