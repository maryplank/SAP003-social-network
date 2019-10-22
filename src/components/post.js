import Button from './button.js';
import Textarea from './textarea.js';

function Post(props) {
  return `<div class="post" data-id="${props.dataId}">
  <span class="post-username primary-font">${props.username}</span>
  <span class="post-date secondary-font">${props.date}</span>
  <span class="post-text secondary-font" id="${props.dataId}">${props.text}</span>
  ${Button({
    id: `delete${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button primary-font',
    onClick: window.post.deletePost,
    title: 'Deletar',
  })}

  ${Button({
    id: `edit${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button primary-font',
    onClick: window.post.editPost,
    title: 'Editar',
  })}

  ${Button({
    id: `save${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button hidden-button primary-font',
    onClick: window.post.saveEditPost,
    title: 'Salvar',
  })}

  ${Button({
    id: `cancel${props.dataId}`,
    dataId: props.dataId,
    class: 'secondary-button hidden-button primary-font',
    onClick: window.post.discardEditPost,
    title: 'Cancelar',
  })}
  </div>`;
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
  const textBox = document.getElementById(id)
  const cancelBtn = document.querySelector(`#cancel${id}`);
  const saveBtn = document.querySelector(`#save${id}`);

  const postCollection = firebase.firestore().collection('post').doc(id);
  postCollection.get().then((snap) => {
    textBox.innerText = snap.data().text;
    textBox.style.border = 'none';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  });
}

window.post = {
  deletePost,
  editPost,
  saveEditPost,
  discardEditPost,
};

export default Post;
