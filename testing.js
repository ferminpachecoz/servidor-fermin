const bcrypt = require('bcryptjs')

let pass = bcrypt.hashSync('pepe123', 10);

/* let check = bcrypt.compareSync('manqui123', pass) */

console.log(pass);