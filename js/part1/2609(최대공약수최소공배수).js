/*
1. 문제설명
- 두 개의 자연수를 받아 최대공약수, 최소공배수를 반환해라
- 10,000이하의 자연수임
2. 아이디어
- 최대공약수 1부터 나누면서 두개다 나머지가 0인애
- 최소공배수 왼쪽수에 1부터 곱하면서 오른쪽수로 나눴을때 나머지가 0인애
3. 시간복잡도
- for문 2번 각각 돌림
*/

const fs = require('fs');
input = fs.readFileSync('./js/input.txt').toString().trim().split(' ');

// 일반 풀이
// var cnt = 2;
// var min = 0;
// var max = 1;

// while (true) {
//   if (Number(input[0]) % cnt == 0 && Number(input[1]) % cnt == 0) {
//     max = cnt
//   }
//   if (cnt > Number(input[1])) {
//     break
//   } else {
//     cnt++;
//   }
// }
// cnt = 1
// while (true) {
//   if ((Number(input[0]) * cnt) % Number(input[1]) == 0) {
//     min = (Number(input[0]) * cnt)
//   }
//   if (min != 0) {
//     break
//   } else {
//     cnt++;
//   }
// }

// console.log(max, min)

//유클리드 호제법
function gcd(a, b) {
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return Math.floor((a * b) / gcd(a, b));
}
var x = 0;
var y = 0;

if (Number(input[0]) > Number(input[1])) {
  x = Number(input[0]);
  y = Number(input[1]);
} else {
  x = Number(input[1]);
  y = Number(input[0]);
}

console.log(gcd(x, y));
console.log(lcm(x, y));
