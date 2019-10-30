
import Button from '../components/button.js';
import Input from '../components/input.js';
import Link from '../components/link.js';

function createUser() {
  const name = document.querySelector('#name').value;
  const lastName = document.querySelector('#lastname').value;
  const areaTeaching = document.querySelector('#teaching-area').value;
  const birthday = document.querySelector('#birthday').value;

  const auth = firebase.auth().currentUser;
  if (auth) {
    firebase.firestore().collection('user').add({
      displayName: name,
      lastname: lastName,
      areaTeach: areaTeaching,
      birthday,
      userUid: auth.uid,
    }).then(() => {
      window.location.href = '#home';
    })
      .catch((error) => {
        document.getElementById('error').innerText = error;
      });
  } else {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((profile) => {
      const user = profile.user;
      firebase.firestore().collection('user').add({
        displayName: name,
        lastname: lastName,
        areaTeach: areaTeaching,
        birthday,
        userUid: user.uid,
      }).catch((error) => {
        document.getElementById('error').innerText = error;
      });
      user.sendEmailVerification().then(() => {
      }).catch(() => {
      });

      window.location.href = '#home';
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('error').innerText = geterrorMessage(errorCode, errorMessage)
    });
  }
}

function geterrorMessage(errorCode, errorMessage) {
  if (errorCode === 'auth/email-already-in-use') {
    return 'E-mail já cadastrado.';
  } else if (errorCode === 'auth/weak-password') {
    return 'Digite uma senha de no mínimo 6 dígtos.';
  } else if (errorCode === 'auth/invalid-email') {
    return 'E-mail inválido.';
  } else if (email === '' || password === '') {
    return 'Preencha os campos em branco';
  } else {
    return errorMessage;
  }
}

function Register() {
  const auth = firebase.auth().currentUser;
  const templateInput = `
    ${Input({
    id: 'email',
    class: 'primary-input secondary-font',
    type: 'email',
    placeholder: 'E-mail',
  })}
    ${Input({
    id: 'password',
    class: 'primary-input secondary-font',
    type: 'password',
    placeholder: 'Senha',
  })}`;

  return `
    <section class ='initial-section'>
      <header class='initial-header'></header>
      <img class='img-section' src='img/logo.png'/>
      <div class="intro-text secondary-font">Registre-se para fazer parte da maior rede social de educação do Brasil!</div>
    
      <form>
  ${Input({
    id: 'name',
    class: 'primary-input secondary-font',
    type: 'text',
    placeholder: 'Nome',
  })}
  ${Input({
    id: 'lastname',
    class: 'primary-input secondary-font',
    type: 'text',
    placeholder: 'Sobrenome',
  })}
  ${Input({
    id: 'birthday',
    class: 'date-input secondary-font',
    type: 'date',
  })}
  ${Input({
    id: 'teaching-area',
    class: 'primary-input secondary-font',
    type: 'text',
    placeholder: 'Área de ensino',
  })}
  ${!auth ? templateInput : ''}

  <p class='login-error primary-font' id="error"></p>

      ${Button({
    id: 'register',
    class: 'primary-button primary-font',
    title: 'Registre-se',
    onClick: createUser,
  })}

  ${Link({
    class: 'primary-link primary-font',
    hash: '#login',
    text: 'Voltar',
  })}
      </form>`;
}

export default Register;
