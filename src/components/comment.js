import Button from './button.js'

function Comment(props) {
  return `<div class='comment-text secondary-font'>
  ${props.text}
  ${Button({
    id: 'delete-comment',
    dataId: props.dataId,
    dataId2: props.dataId2,
    class: 'delete-comment delete secondary-button primary-font',
    onClick: window.post.deleteComment,
    title: '',
  })}
    </div>`;
};

export default Comment;
