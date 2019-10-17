import Button from './button.js';
import Icon from './icon.js';

function logOut() {
  firebase.auth().signOut().then(() => {
    window.location.href = '#login';
  }).catch((error) => {
    document.getElementById('error').innerText = `${error.code} ${error.message} - Ocorreu um erro no logout.`;
  });
}

function Navbar() {
  const template = `
  <nav class="navbar">
    ${Button({
    title: '../img/logout-icon.png',
    class: 'navbar-icon',
    onClick: window.nav.logOut,
    })}
  </navbar>
`;
  const frag = document.createRange().createContextualFragment(template);
  return frag;
}

window.nav = {
  logOut,
  Button,
  Icon,
};

export default Navbar;
