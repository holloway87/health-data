export default (date) => {
  let month = date.getMonth() + 1;

  return (
    date.getFullYear() +
    "-" +
    (10 > month ? "0" : "") +
    month +
    "-" +
    (10 > date.getDate() ? "0" : "") +
    date.getDate()
  );
};
