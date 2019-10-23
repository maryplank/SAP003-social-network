import Post from './post.js';
import Date from './date.js';

function printPosts(post) {
  const feed = document.querySelector('#feed');

  const template = window.feed.Post({
    dataId: post.id,
    username: post.data().user_name,
    date: Date({ timestamp: post.data().timestamp }),
    text: post.data().text,
    likesCount: post.data().likes,
  });

  feed.innerHTML += template;
}

function loadUserFeed() {
  const postCollection = firebase.firestore().collection('post');
  const currentUserId = firebase.auth().currentUser.uid;
  postCollection.orderBy('timestamp', 'desc').where('user_id', '==', currentUserId).get().then((snap) => {
    snap.forEach(post => window.feed.printPosts(post));
  });
  return '';
}

function Feed() {
  return `
  <div id="feed" class ="feed">${window.feed.loadUserFeed()}</div>
  `;
}

window.feed = {
  printPosts,
  loadUserFeed,
  Post,
  Feed,
};

export { loadUserFeed, Feed };
