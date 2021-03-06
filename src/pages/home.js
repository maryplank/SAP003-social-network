import Button from '../components/button.js';
import Textarea from '../components/textarea.js';
import { loadFeed, Feed } from '../components/feed.js';
import Post from '../components/post.js';

function logOut() {
  firebase.auth().signOut().then(() => {
    window.location.href = '#login';
  }).catch((error) => {
    document.getElementById('error').innerText = `${error.code} ${error.message} - Ocorreu um erro no logout.`;
  });
}

function createNewPost() {
  const content = document.querySelector('#postText');
  const feed = document.querySelector('#feed');
  const user = firebase.auth().currentUser;
  firebase.firestore().collection('user').where('userUid', '==', user.uid).get()
    .then((snap) => {
      const post = {
        text: content.value,
        likes: 0,
        user_name: user.displayName == null ? snap.docs[0].data().displayName : user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userUid: user.uid,
      };
      firebase.firestore().collection('post').add(post).then(() => {
        feed.innerHTML = '';
        content.value = '';
        window.home.loadFeed();
      });
    });
}

function profile() {
  window.location.href = '#profile';
}

function Home() {
  window.location.href = '#home';

  const template = `
  ${Button({
    class: 'primary-button primary-font',
    onClick: window.home.logOut,
    title: 'Log out',
  })}
  ${Button({
    class: 'primary-button primary-font',
    onClick: window.home.profile,
    title: 'Perfil',
  })}
  <form>
  ${Textarea({
    id: 'postText',
    class: 'post-textbox secondary-font',
    placeholder: 'O que você está pensando agora?',
  })}
  
  ${Button({
    class: 'primary-button primary-font',
    onClick: window.home.createNewPost,
    title: 'Post!',
  })}
   
  </form>

  ${Feed()}
  `;

  return template;
}

window.home = {
  logOut,
  profile,
  Post,
  loadFeed,
  createNewPost,
};

export default Home;
