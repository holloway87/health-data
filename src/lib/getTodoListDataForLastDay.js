import getTodoListData from "./getTodoListData";

export default () => {
  let data = getTodoListData();

  let keys = Object.keys(data);
  if (!keys.length) {
    return [];
  }

  return data[keys[keys.length - 1]];
};
