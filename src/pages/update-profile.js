
import Button from '../components/button.js';
import Input from '../components/input.js';

function backToProfile() {
  window.location = '#profile';
}

function save() {
  const name = document.querySelector('#nome');
  const sobreNome = document.querySelector('#sobrenome');
  const areaTeaching = document.querySelector('#teaching-area');
  const userAuth = firebase.auth().currentUser;
  firebase.firestore().collection('user').where('userUid', '==', userAuth.uid).get()
    .then((usersnapshot) => {
      usersnapshot.forEach((usersnap) => {
        usersnap.ref.update({
          name: name.value,
          lastname: sobreNome.value,
          areaTeach: areaTeaching.value,
        });
      });
    });
}

function UpdateProfile() {
  const template = `
    <h1>Editar Perfil</h1>
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
  <p class='login-error' id="error"></p>
    </form>
`;
  return template;
}

window.configuration = {
  save,
  backToProfile,
};

export default UpdateProfile;
