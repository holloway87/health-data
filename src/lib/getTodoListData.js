export default () => {
  let data = localStorage.getItem("todo-list-entries");
  if (null === data) {
    data = "";
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};
