function Button(props) {
  return `<button class="${props.class}" onclick="button.handleClick(event, ${props.onClick})">${props.title}</button>`;
}

window.button = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback();
  },
};

export default Button;
