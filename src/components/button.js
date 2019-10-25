

function Button(props) {
  return `<button id="${props.id}" data-id="${props.dataId}" data-id2="${props.dataId2}" class="${props.class}" onclick="button.handleClick(event, ${props.onClick})"> ${props.title}</button>`;
}

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback(event);
  },
  component: Button,
};

export default Button;
