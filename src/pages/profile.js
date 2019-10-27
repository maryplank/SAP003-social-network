import Button from '../components/button.js';

function profileEdit() {
  window.location = '#configuration';
}

function backToHome() {
  window.location = '#home';
}

function printProfile() {
  const userAuth = firebase.auth().currentUser;
  firebase.firestore().collection('user').where('userUid', '==', userAuth.uid).get()
    .then((usersnapshot) => {
      usersnapshot.forEach((user) => {
        const userProfile = document.querySelector('#profile2');
        const nome = user.data().displayName;
        const sobrenome = user.data().lastname;
        const birthday = user.data().birthday;
        const areaTeaching = user.data().areaTeach;
        const profileTemplate = `
      <h3>${nome} ${sobrenome}</h3>
      <p>${areaTeaching}</p>
      <p>${birthday}</p>
      `;
        userProfile.innerHTML = profileTemplate;
      });
    });
}


function postToProfile() {
  const postCollection = firebase.firestore().collection('post');
  const userAuth = firebase.auth().currentUser.uid;
  postCollection.orderBy('timestamp', 'desc').where('userUid', '==', userAuth).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((post) => {
        post.ref.collection('comments').get()
          .then((commentSnapshot) => {
            const comments = [];
            commentSnapshot.forEach((comment) => {
              comments.push({ ...comment.data(), id: comment.id });
            });
            window.feed.printPosts(post, comments);
          });
      });
    });
}

function Profile() {
  window.profile.postToProfile();
  window.profile.printProfile();
  const userProfile = `
    <p id="profile2"></p>
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
  <div id="feed" class ="feed"></div>
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
