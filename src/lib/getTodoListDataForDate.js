import getTodoListData from "./getTodoListData";

export default (date) => {
  let data = getTodoListData();

  if ("object" === typeof data[date]) {
    return data[date];
  }

  return [];
};
