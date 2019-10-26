
import Button from '../components/button.js';
import Input from '../components/input.js';
import Link from '../components/link.js';

function createUser() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const name = document.querySelector('#name').value;
  const lastName = document.querySelector('#lastname').value;
  const areaTeaching = document.querySelector('#teaching-area').value;
  const birthday = document.querySelector('#birthday').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then((profile) => {
    const user = profile.user;


    firebase.firestore().collection('user').add({
      displayName: name,
      lastname: lastName,
      areaTeach: areaTeaching,
      brithday: birthday,
      userUid: user.uid,
    }).catch((error) => {
      document.getElementById('error').innerText = error;
    });
    // user.updateProfile({
    //   displayName: name,
    //   lastname: lastName,
    //   areaTeach: areaTeaching,
    // }).catch((error) => {
    //   document.getElementById('error').innerText = error;
    // });

    user.sendEmailVerification().then(() => {
    }).catch(() => {
    });
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      document.getElementById('error').innerText = 'E-mail já cadastrado.';
    } else if (errorCode === 'auth/weak-password') {
      document.getElementById('error').innerText = 'Digite uma senha de no mínimo 6 dígtos .';
    } else if (errorCode === 'auth/invalid-email') {
      document.getElementById('error').innerText = 'E-mail inválido.';
    } else if (email === '' || password === '') {
      errorMessage.textContent = 'Preencha os campos em branco';
    } else {
      document.getElementById('error').innerText = errorMessage;
    }
  });
}

function Register() {
  return `
    <section class ='initial-section'>
      <header class='initial-header'></header>
      <img class='img-section' src='img/logo.png'/>
      <div class="text">Registre-se para fazer parte da maior rede social de educação do Brasil!</div>
    
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
    class: 'primary-input secondary-font',
    type: 'date',
  })}
  ${Input({
    id: 'teaching-area',
    class: 'primary-input secondary-font',
    type: 'text',
    placeholder: 'Área de ensino',
  })}
  ${Input({
    id: 'email',
    class: 'primary-input',
    type: 'email',
    placeholder: 'E-mail',
  })}
  ${Input({
    id: 'password',
    class: 'primary-input',
    type: 'password',
    placeholder: 'Senha',
  })}
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
  <p class='login-error' id="error"></p>
      </form>`;
}

export default Register;
