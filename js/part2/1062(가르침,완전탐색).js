/*
1. 문제설명
- K개의 글자를 가르칠 수 밖에 없음 무러 가르쳐야 읽을 수 있는 단어가 최대인가??

2. 아이디어
- 
3. 시간복잡도
- N <=50, K <= 26
*/

const fs = require('fs');
[input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var [N, K] = input.split(' ').map(Number);

var confirm_arr = ['a', 'n', 't', 'i', 'c'];
var str_arr = [];
var str = [];
var result = 0;
var available_cnt = K - 5;
// console.log(arr)

if (available_cnt < 0) {
  result = 0;
} else {
  let possible = arr.length;
  arr.forEach((w) => {
    const clear = [
      ...new Set(w.split('').filter((v) => !confirm_arr.includes(v))),
    ];
    // console.log('clear: ', clear);
    if (clear.length <= available_cnt) {
      str = [...str, ...clear];
      str_arr.push(clear);
    } else {
      possible--;
    }
  });

  str = [...new Set(str)];
  if (str.length <= available_cnt) {
    //배워야하는 알파벳 수가 배울 수 있는 알파벳 수보다 작거나 같으면 계산할 필요 x
    result = possible;
  } else {
    //탐색 시작
    for (let i = 0; i < (1 << str.length); i++) {
      let sum = 0;
      if (countBits(i) === available_cnt) {
        const learnedStr = str.filter((_, index) => i & (1 << index));
        str_arr.forEach((w) => {
          if (canLearn(w, learnedStr)) {
            sum++;
          }
        });
      }

      if (result < sum) {
        result = sum;
      }
    }
  }
}
console.log(result);

function countBits(n) {
  let cnt = 0;
  while (n > 0) {
    if (n & 1) {
      cnt++;
    }
    n = n >> 1;
  }
  return cnt;
}
function canLearn(word, can) {
  for (let i = 0; i < word.length; i++) {
    if (!can.includes(word[i])) {
      return false;
    }
  }
  return true;
}
