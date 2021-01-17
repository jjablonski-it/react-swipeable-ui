const classes = (...args: string[]) => {
  return args.filter((arg) => arg).join(" ");
};

export default classes;
