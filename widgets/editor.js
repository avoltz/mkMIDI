document.addEventListener('DOMContentLoaded', function() {
  let editor_controls = document.getElementsByClassName("editor-controls");
  let editor_container = document.getElementsByClassName("editor-container");
  if (editor_container.length != 1) {
    console.log('could not find editor-container. cannot load editor');
    return;
  }
  editor_container = editor_container[0];
  let links = document.getElementsByClassName("editor-swap-view");
  let link_click = function() {
    for (let i = 0; i < editor_controls.length; i++) {
      editor_controls[i].classList.toggle("right");
    }
    editor_container.classList.toggle("col");
  };
  for (let i = 0; i < links.length; i++) {
    links[i].onclick = link_click;
  }
});
