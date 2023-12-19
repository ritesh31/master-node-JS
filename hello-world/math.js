function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// exports.add1 = (a, b) => a + b;
// exports.sub1 = (a, b) => a - b;
// We can also export functions like above syntax

module.exports = { add, sub };
