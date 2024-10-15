/*
1. 문제설명
- 빗물의 총량 구하기
- 
2. 아이디어
- simul 모델 만들고 10으로만 이루어지게 해서 넓이계산
3. 시간복잡도
- for문2번 + for + for 
*/
const fs = require('fs');
[input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [y, x] = input.split(' ').map(Number);
const model = arr[0].split(' ').map(Number);
// console.log('model: ', model);

var simul = Array(y)
  .fill()
  .map(() => Array(x).fill(0));

for (let i = 0; i < x; i++) {
  for (let j = 0; j < model[i]; j++) {
    simul[j][i] = 1;
  }
}
// console.log('simul: ', simul);

function count_arr(arr) {
  var check = false;
  var zero_count = 0;
  var total = 0
  for (i of arr) {
    if (i === 1) {
      check = true
      total += zero_count
      zero_count = 0
    } else if (i === 0 && check === true) {
      zero_count += 1
    }
  }
  return total
}
var result = 0;

for (let i = 0; i < y; i++) {
  result += count_arr(simul[i])
}

console.log(result)