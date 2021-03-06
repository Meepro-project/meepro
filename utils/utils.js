export const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const filterKeys = keys => obj => {
  const res = {};
  for (const key in obj) {
    if (keys.includes(key)) Object.assign(res, { [key]: obj[key] });
  }
  return res;
};

function AssertionException(msg) {
  this.message = msg;
  this.name = "AssertionException";
}
export const assert = bool => {
  if (!bool) throw new AssertionException(bool);
};
