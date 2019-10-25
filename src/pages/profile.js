import Button from '../components/button.js';

function profileEdit() {
  window.location = '#configuration';
}

function backToHome() {
  window.location = '#home';
}

function printProfile(user) {
  const userProfile = document.querySelector('#profile');
  const nome = user.data().displayName;
  const sobrenome = user.data().lastname;
  const birthday = user.data().birthday;
  const areaTeaching = user.data().areaTeach;
  const profileTemplate = `
    <h3>${nome} ${sobrenome}</h3>
    <p>${areaTeaching}</p>
    `;
  userProfile.innerHTML = profileTemplate;
}


function postToProfile() {
  const postCollection = firebase.firestore().collection('post');
  const userAuth = firebase.auth().currentUser.uid;
  postCollection.orderBy('timestamp', 'desc').where('userUid', '===', userAuth).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        window.feed.printPosts(post);
      });
    });
}

function Profile() {
  const userProfile = `
    <p id="profile"></p>
  ${Button({
    class: 'primary-button primary-font',
    title: 'Editar perfil',
    onClick: window.profile.profileEdit,
  })}
  ${Button({
    class: 'primary-button primary-font',
    title: 'Retornar ao Feed',
    onClick: window.profile.backToHome,
  })}
    `;
  return userProfile;
}

window.profile = {
  profileEdit,
  backToHome,
  printProfile,
  postToProfile,
};

export default Profile;
