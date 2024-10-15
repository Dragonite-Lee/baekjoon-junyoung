/*
1. 문제설명
- 첫째줄엔 수열의 갯수
- 두번째줄엔 수열
- 세번째줄엔 + - * % 의 갯수
- 수와 수 사이에 연산자를 넣어 수식을 만들 수 있음
2. 아이디어
- 
3. 시간복잡도
- 
*/

//-2 /3 일때 양수로 바꾼뒤 몫을 취하고 다시 음수로 바꾸는건 ~~(-2/3)으로 작성

const fs = require('fs');
const [input, array, tools_count] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((v) => v.split(' ').map(Number));

const calculrate = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => ~~(a / b),
];

var max = -1000000000;
var min = 1000000000;

function recur(num = 0, result = array[0]) {
  if (num === Number(input[0]) - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
  } else {
    for (let i = 0; i < 4; i++) {
      if (!tools_count[i]) {
        continue;
      }
      tools_count[i]--;
      recur(num + 1, calculrate[i](result, array[num + 1]));
      tools_count[i]++;
    }
  }
}

recur();
console.log(max);
console.log(min);
