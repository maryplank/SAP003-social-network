import Login from './pages/login.js';
import Register from './pages/register.js';
import Home from './pages/home.js';
import Profile from './pages/profile.js';
import UpdateProfile from './pages/update-profile.js';

const main = document.querySelector('main');
const body = document.querySelector('body');

function onHashChange() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      switch (window.location.hash) {
        case '#register':
          body.className = 'background';
          main.innerHTML = Register();
          break;

        case '#profile':
          main.innerHTML = Profile();
          break;
        case '#configuration':
          main.innerHTML = UpdateProfile();
          break;
        default:
          main.innerHTML = Home();
          break;
      }
    } else {
      switch (window.location.hash) {
        case '#register':
          body.className = 'background';
          main.innerHTML = Register();
          break;
        default:
          body.className = 'background';
          main.innerHTML = Login();
      }
    }
  });
}

window.addEventListener('load', onHashChange);
window.addEventListener('hashchange', () => {
  onHashChange();
}, false);
