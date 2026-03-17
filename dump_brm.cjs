const fs = require('fs');
const { Buffer } = require('buffer');

const filePath = '../CONCEITUAL_1.brM';
const data = fs.readFileSync(filePath);
console.log('File size:', data.length);
// Let's print out the content as ascii/hex to see the strings inside
let str = '';
for (let i = 0; i < Math.min(data.length, 2000); i++) {
  const char = String.fromCharCode(data[i]);
  if (char >= ' ' && char <= '~') str += char;
  else str += '.';
}
console.log(str);
