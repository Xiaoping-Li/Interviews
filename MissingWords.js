/*
s is a sentence with only words and space, t is subsentence of s. Find all the missing words in t in order
*/

function missingwords (s,t) {
  const sArray = s.split(' ');
  const tArray = t.split(' ');
  const rtn = [];
  let i = 0;
  let j = 0;
  while (i < sArray.length && j < tArray.length) {
    if (sArray[i] !== tArray[j]) {
      rtn.push(sArray[i]);
      i++;
    } else {
      i++;
      j++;
    }
  }
  
  return rtn.concat(sArray.slice(i));
}

const s = 'I am using a to improve code';
const t = 'am a to improve';
missingwords(s,t);
