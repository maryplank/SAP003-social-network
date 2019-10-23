import Button from './button.js';
import Textarea from './textarea.js';

function Post(props) {
  
    return `
      <div class="post" data-id="${props.dataId}">
      <span class="post-username primary-font">${props.username}</span>
      <span class="post-date secondary-font">${props.date}</span>
      <span class="post-text secondary-font" id="${props.dataId}" >${props.text}</span>
        
        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onClick: window.post.deletePost,
          title: 'Deletar',
        })}

        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onClick: window.post.editPost,
          title: 'Editar',
        })}

        ${Button({
          dataId: props.dataId,
          class: 'secondary-button primary-font',
          onCick: window.post.saveEditPost,
          title: 'Salvar',
        })}
        <ul>
          <li>
            ${Input({
              id: 'comment1',
              class: 'post-textbox secondary-font',
              placeholder: 'Insira seu comentário',
            })}

            ${Button({
              dataId: props.dataId,
              class: 'secondary-button primary-font',
              onClick: window.post.commentPost,
              title: 'Comentar',
            })}

          </li>
        </ul>  
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
  postText.setAttribute('contentEditable', 'true');
  postText.focus();
  postText.style.border = '1px solid #e37b40';
}

function saveEditPost(event) {
  const id = event.target.dataset.id;
  const saveText = document.getElementById(id);
  const newText = saveText.textContent;
  firebase.firestore().collection('post').doc(id).update({
    text: newText,
  });
  saveText.setAttribute('contentEditable', 'false');
  saveText.style.border = 'none';
}

function commentPost(event){
  const id = event.target.dataset.id;
  const commentText = document.querySelector('#comment1').value;
  event.target.insertAdjacentHTML('afterend', `<li>${text}</li>`)
  firebase.firestore().collection(`post/${id}/comments`).add({commentText});
  console.log(commentText)
}

  
  // ${Button
  //   dataId: props.dataId,
  //   class: 'secondary-button primary-font',
  //   onClick: window.post.commentPost,
  //   title: 'Comentar',
  // })}

// function commentPost(props){
//   ` <div>
//     ${window.post.Textarea({
//       id: `comment${props.dataId}`,
//       class: 'comment-textbox secondary-font',
//       placeholder: 'O que você está pensando agora?',
//     })}

//    ${window.post.Button({
//       dataId: props.dataId,
//       class: 'secondary-button primary-font',
//       onClick: window.post.deletePost,
//       title: 'Deletar',
//     })}

//     ${window.post.Button({
//       dataId: props.dataId,
//       class: 'secondary-button primary-font',
//       onClick: window.post.editPost,
//       title: 'Editar',
//     })}

//     ${window.post.Button({
//       dataId: props.dataId,
//       class: 'secondary-button primary-font',
//       onClick: window.post.saveEditPost,
//       title: 'Salvar',
//     })}
//   </div>`;

//   firebase.firestore().collection('post').add(comment).then(() => {
//     feed.innerHTML = '';
//     content.value = '';
//     window.home.commentPost();
//   })
// }



// function commentPost(event){
//   const id = event.target.dataset.id;
//   const commentText = document.getElementById(id); queryselector.value
//   firebase.firestore().collection(`post/${id}/comments`).add({text})

window.post = {
  Textarea,
  deletePost,
  editPost,
  saveEditPost,
  commentPost,
};

export default Post;
