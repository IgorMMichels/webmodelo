import fs from 'fs';
import { BrmSerializer } from './src/services/brmSerializer.js';

try {
  const buf = fs.readFileSync('../CONCEITUAL_1.brM');
  const arr = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const model = BrmSerializer.parse(arr);
  fs.writeFileSync('brM_dump.json', JSON.stringify(model, null, 2));
  console.log('Successfully saved brM_dump.json');
} catch (e) {
  console.error('Error:', e);
}
