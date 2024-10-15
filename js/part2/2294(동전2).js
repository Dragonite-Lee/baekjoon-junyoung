/*
1. 문제설명
- n가지 종류의 동전이 있음
- 적당히 사용해 합이 k원이 되게끔 하려함 근데, 동전 개수 최소!
2. 아이디어
- 
3. 시간복잡도
*/

const fs = require('fs')
const [input, ...arr] = fs.readFileSync('./js/input.txt').toString().trim().split('\n');

const [n, k] = input.split(' ').map(Number)
const num_arr = arr.map(Number)
console.log('num_arr: ', num_arr);