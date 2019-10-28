
import Button from '../components/button.js';
import Input from '../components/input.js';

function backToProfile() {
  window.location = '#profile';
}

function save() {
  const name = document.querySelector('#nome').value;
  const sobreNome = document.querySelector('#sobrenome').value;
  const areaTeaching = document.querySelector('#teaching-area').value;
  const birthday = document.querySelector('#birthday').value;
  const userAuth = firebase.auth().currentUser;

  if (name === '' || sobreNome === '' || areaTeaching === '' || birthday === '') {
    document.getElementById('error').innerText = 'Preencha os campos em branco';
  } else {
    firebase.firestore().collection('user').where('userUid', '==', userAuth.uid).get()
      .then((usersnapshot) => {
        usersnapshot.forEach((usersnap) => {
          usersnap.ref.update({
            displayName: name,
            lastname: sobreNome,
            areaTeach: areaTeaching,
            birthday,
          });
        });
      });
  }
}

function UpdateProfile() {
  const template = `
    <h1 class="intro-text tertiary-font">Editar Perfil</h1>
    <form>
  ${Input({
    id: 'nome',
    class: 'primary-input secondary-font',
    type: 'text',
    placeholder: 'Nome',
  })}
  ${Input({
    id: 'sobrenome',
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
  ${Button({
    class: 'primary-button primary-font',
    title: 'Salvar',
    onClick: window.configuration.save,
  })}
  ${Button({
    class: 'primary-button primary-font',
    title: 'Voltar ao perfil',
    onClick: window.configuration.backToProfile,
  })}
  <p class='login-error primary-font' id="error"></p>
    </form>
`;
  return template;
}

window.configuration = {
  save,
  backToProfile,
};

export default UpdateProfile;
