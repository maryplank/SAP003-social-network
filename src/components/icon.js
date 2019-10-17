function Icon(props) {
  return `<img src="${props.src}" alt="${props.alt}" class="${props.class}" onclick="icon.handleClick(event, ${props.onClick})">`;
}

window.icon = {
  handleClick: (event, callback) => {
    event.preventDefault();
    callback();
  },
};

export default Icon;
