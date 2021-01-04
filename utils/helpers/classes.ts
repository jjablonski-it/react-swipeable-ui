const classes = (...args) => {
  return args.filter((arg) => arg).join(" ");
};

export default classes;
