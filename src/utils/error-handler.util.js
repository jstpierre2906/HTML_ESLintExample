module.exports = (error, level = "warning") => {
  switch (level) {
    case "info":
      console.log(error);
      break;
    case "error":
      console.error(error);
      break;
    default:
      console.warn(error);
  }
  return null;
};
