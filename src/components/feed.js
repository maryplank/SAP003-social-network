import Post from './post.js';
import Date from './date.js';

function printPosts(post, comments) {
  const feed = document.querySelector('#feed');

  const template = window.feed.Post({
    dataId: post.id,
    username: post.data().displayName,
    date: Date({ timestamp: post.data().timestamp }),
    text: post.data().text,
    comments,
    likesCount: post.data().likes,
  });
  feed.innerHTML += template;
}

function loadFeed() {
  const postCollection = firebase.firestore().collection('post');
  postCollection.orderBy('timestamp', 'desc').get().then((snap) => {
    snap.forEach((post) => {
      post.ref.collection('comments').get()
        .then((querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((comment) => {
            comments.push(comment.data());
          });
          window.feed.printPosts(post, comments);
        });
    });
  });
  return '';
}

function Feed() {
  return `
  <div id="feed" class ="feed">${window.feed.loadFeed()}</div>
  `;
}

window.feed = {
  printPosts,
  loadFeed,
  Post,
  Feed,
};

export { loadFeed, Feed };
