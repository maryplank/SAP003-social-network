import Post from './post.js';
import Date from './date.js';

function printPosts(post, comments) {
  const feed = document.querySelector('#feed');
  
  const template = window.feed.Post({
    dataId: post.id,
    username: post.data().user_name,
    date: Date({ timestamp: post.data().timestamp }),
    text: post.data().text,
    comments: comments
  });
  feed.innerHTML += template;
}

function loadFeed() {
  const postCollection = firebase.firestore().collection('post');
  postCollection.orderBy('timestamp', 'desc').get().then((snap) => {
    snap.forEach(post => {  
      // firebase.firestore().collection('post/012OOZ3lxcKDN5n6jlZQ/comments')
      post.ref.collection('comments').get()
        .then((querySnapshot) => {
          const comments = [];
          querySnapshot.forEach((comment) => {
            comments.push(comment.data());
          })
          window.feed.printPosts(post, comments);
        })
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
