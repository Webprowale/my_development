sha3 = require('js-sha3');
let sha3_256hash = sha3.sha3_256('hello').toString();
console.log("SHA3-256('hello') =", sha3_256hash);