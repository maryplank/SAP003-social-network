function Textarea(props) {
  return `<textarea id="${props.id}" data-id="${props.dataId}" class="${props.class}" auto-complete="off" placeholder="${props.placeholder}"></textarea>`;
}

export default Textarea;
