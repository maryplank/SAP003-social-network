
import Button from '../components/button.js';
import Input from '../components/input.js';

function backToProfile() {
  window.location = '#profile';
}

function save() {
  const user = firebase.auth().currentUser;
  const name = document.querySelector('#nome');
  const sobreNome = document.querySelector('#sobrenome');
  const areaTeaching = document.querySelector('#teaching-area');
  // const file = document.querySelector('#photo').files[0];

  admin.auth().updateUser(uid, {
    displayName: name.value,
    sobrenome: sobreNome.value,
    areaTeach: areaTeaching,
    // photoURL: file,
  }).catch((error) => {
    document.getElementById('error').innerText = error;
  });


  firebase.firestore().collection('user')
    .where('userUid', '==', user.uid)
    .onSnapshot((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        doc.update({
          displayName: name,
          sobrenome: sobreNome,
        });
      });

      // querySnapshot.forEach((doc) => {
      // doc.update({
      //   displayName: name,
      //   sobrenome: sobreNome,
      // });

      //   console.log(`${doc.id} => ${doc.data()}`);
      // });
      // console.log('---------> aqui');
      // console.log(querySnapshot);
    });

  const storageRef = firebase.storage().ref();

  const mountainImagesRef = storageRef.child('images/mountains.jpg');
  mountainImagesRef.put(file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    console.log(snapshot);
  });
}

function UpdateProfile() {
  const template = `
    <h1>Editar Perfil</h1>
    <form>
    ${Input({
    id: 'photo',
    class: 'primary-input secondary-font',
    type: 'file',
  })}
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
