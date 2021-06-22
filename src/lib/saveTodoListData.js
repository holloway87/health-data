export default (data) => {
  localStorage.setItem("todo-list-entries", JSON.stringify(data));
};
