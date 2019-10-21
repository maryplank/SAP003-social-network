import Button from '../components/button.js';
import Input from '../components/input.js';
import Link from '../components/link.js';

function userLogin() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          document.getElementById('error').innerText = 'Usuário não cadastrado.';
        } else if (errorCode === 'auth/wrong-password') {
          document.getElementById('error').innerText = 'Senha incorreta';
        }
      });
  }).catch(() => {
    document.getElementById('error').innerText = 'Erro ao identificar seu login';
  });
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      const token = result.credential.accessToken;
      const user = result.user;
      if (user) {
        window.location.href = '#home';
      }
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      const email = error.email;
      console.log(email);

      const credential = error.credential;
      if (errorCode === 'auth/user-not-found') {
        document.getElementById('error').innerText = `${errorMessage} - erro no login do google`;
      } else if (errorCode === 'auth/wrong-password') {
        document.getElementById('error').innerText = `${errorMessage} - senha incorreta`;
      }
    });
  }).catch(() => {
    document.getElementById('error').innerText = 'Erro ao identificar seu login';
  });
}

function userRegister() {
  window.location.href = '#register';
}

function Login() {
  window.location.href = '#login';

  const login = `
    <section class ='initial-section'>
      <img class='img-section' src='img/logo.png'/>
      <div class="intro-text secondary-font">Bem vindo à maior rede social de educação do Brasil!</div>
      
      <form>
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
  })}
      ${Button({
    class: 'primary-button primary-font',
    title: 'Entrar',
    onClick: userLogin,
  })}
      ${Button({
    class: 'google-login primary-login',
    title: '<img src="../img/google.png">',
    onClick: googleLogin,
  })}
        </form>

        ${Input({
          id: 'password',
          class: 'primary-input',
          type: 'password',
          placeholder: 'Senha',
        })}
        <p class='login-error' id="error"></p>

        ${Button({
          class: 'primary-button',
          title: 'Entrar',
          onClick: userLogin,
        })}

        ${Button({
          class: 'primary-button google-icon',
          title: 'Entrar com Google',
          onClick: googleLogin,
        })}

        ${Button({
          class: 'primary-button',
          title: 'Registre-se',
          onClick: userRegister,
        })}
      </form>
      
        
      ${Link({
        class: 'register-link',
        hash: '#register',
        text: 'Registre-se',
      })}

    </section>
  `;

  return login;
}

export default Login;
