const time = (interest, t = 10) => {
  return interest * t;
};
const simpleint = (p, r, callback) => {
  const simple = (p * r) / 100;
  return callback(interest);
};
const interest = simpleint(100000000, 12);
