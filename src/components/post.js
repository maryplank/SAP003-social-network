import Button from './button.js';
import Input from './input.js';
import Textarea from './textarea.js';
import Comment from './comment.js';

function Post(props) {
  const commentsTemplate = props.comments.map(comment => Comment({
    text: comment.commentText,
    dataId: comment.id,
    dataId2: props.dataId,
  })).join('');

  return `<div class="post" data-id='${props.dataId}'>
  <span class="post-username primary-font">${props.username}</span>
  <span class="post-date secondary-font">${props.date}</span>
  <span class="post-text secondary-font" id="${props.dataId}">${props.text}</span>
  <div class="buttons-container">
  ${Button({
    id: `likes${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button like primary-font',
    onClick: window.post.newLike,
    title: props.likesCount,
  })}

  ${Button({
    id: `delete${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button delete primary-font',
    onClick: window.post.deletePost,
    title: '',
  })}

  ${Button({
    id: `edit${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button edit primary-font',
    onClick: window.post.editPost,
    title: '',
  })}

  ${Button({
    id: `save${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button confirm hidden-button primary-font',
    onClick: window.post.saveEditPost,
    title: '',
  })}

  ${Button({
    id: `cancel${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button cancel hidden-button primary-font',
    onClick: window.post.discardEditPost,
    title: '',
  })}
  </div>
    <form class="comment-container">
  ${Input({
    id: `comment${props.dataId}`,
    class: 'comment-textbox secondary-font',
    placeholder: 'Insira seu comentário',
  })}

  ${Button({
    dataId: props.dataId,
    class: 'secondary-button comment primary-font',
    onClick: window.post.commentPost,
    title: '',
  })}

   </form>
   <div id='comments-feed' class='comments-feed secondary-font'>
   ${commentsTemplate}
   </div>
</div>
`;
}

function deletePost(event) {
  const id = event.target.dataset.id;
  firebase.firestore().collection('post').doc(id).delete();
  event.target.parentElement.remove();
}

function editPost(event) {
  const id = event.target.dataset.id;
  const postText = document.getElementById(id);
  const cancelBtn = document.querySelector(`#cancel${id}`);
  const saveBtn = document.querySelector(`#save${id}`);
  postText.setAttribute('contentEditable', 'true');
  postText.focus();
  postText.style.border = '1px solid #e37b40';
  saveBtn.style.display = 'inline-block';
  cancelBtn.style.display = 'inline-block';
}

function saveEditPost(event) {
  const id = event.target.dataset.id;
  const saveText = document.getElementById(id);
  const newText = saveText.textContent;
  const cancelBtn = document.querySelector(`#cancel${id}`);
  const saveBtn = document.querySelector(`#save${id}`);
  firebase.firestore().collection('post').doc(id).update({
    text: newText,
  });
  saveText.setAttribute('contentEditable', 'false');
  saveText.style.border = 'none';
  saveBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
}

function discardEditPost(event) {
  const id = event.target.dataset.id;
  const textBox = document.getElementById(id);
  const cancelBtn = document.querySelector(`#cancel${id}`);
  const saveBtn = document.querySelector(`#save${id}`);

  firebase.firestore().collection('post').doc(id).get()
    .then((snap) => {
      textBox.innerText = snap.data().text;
      textBox.style.border = 'none';
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
    });
}

function newLike(event) {
  const id = event.target.dataset.id;
  const likesBtn = document.querySelector(`#likes${id}`);
  firebase.firestore().collection('post').doc(id).get()
    .then((snap) => {
      const likesCount = snap.data().likes + 1;
      firebase.firestore().collection('post').doc(id).update({
        likes: likesCount,
      });
      likesBtn.innerText = likesCount;
    });
}

function commentPost(event) {
  const id = event.target.dataset.id;
  let commentText = document.querySelector(`#comment${id}`).value;
  const commentFeed = document.querySelector('#comments-feed');
  const newComment = window.post.Comment({
    text: commentText,
    dataId: id,
  });

  commentFeed.insertAdjacentHTML('afterbegin', newComment);
  firebase.firestore().collection(`post/${id}/comments`).add({ commentText })
    .then(() => {
      commentText = '';
    });
}

function deleteComment(event) {
  const idC = event.target.dataset.id;
  const idP = event.target.dataset.id2;
  firebase.firestore().collection(`post/${idP}/comments`).doc(idC).delete();
  event.target.parentElement.remove();
}


window.post = {
  Textarea,
  deletePost,
  editPost,
  saveEditPost,
  commentPost,
  discardEditPost,
  newLike,
  deleteComment,
  Comment,
};

export default Post;
