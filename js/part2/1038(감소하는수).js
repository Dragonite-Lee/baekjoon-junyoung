/*
1. 문제설명
- 음이 아닌 정수 x의 자릿수가 가장 큰 자릿수부터 작은 자릿수까지 감소한다면, 그 수를 감소하는 수라고 함
- 예를들면 321 950 
- N번째 감소하는 수를 출력하기 0은 0번째 1은 1번째 감소하는 수 
2. 아이디어
- 일단 해당 수가 감소하는 수인지 확인하는 함수
3. 시간복잡도
 */

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim();
var N = Number(input);

var decrease_arr = [];

var num_arr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

for (let i = 1; i <= 1023; i++) {
  let a = num_arr.filter((_, index) => i & (1 << index));

  // a가 비어 있지 않을 때만 처리
  let num = Number(a.join(''));
  decrease_arr.push(num);
}

// 오름차순으로 정렬
decrease_arr.sort((a, b) => a - b);
// console.log(decrease_arr.length)
// N이 유효한 인덱스인지 체크
if (N > 1022) {
  console.log(-1); // N이 배열의 크기를 초과하면 -1 출력
} else {
  console.log(decrease_arr[N]); // N번째 감소하는 수 출력
}
