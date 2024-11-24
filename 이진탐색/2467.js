/**
 * 문제설명
 * 숫장 배열이 주어짐 0에 가까운 두 용액 찾기
 * 아이디어
 * N은 100,000이하의 정수
 * 시간복잡도
 */
const fs = require('fs');
const [input, arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
// console.log('N: ', N);
const graph = arr.split(' ').map(Number);

graph.sort((a, b) => a - b);

var left = 0;
var right = N - 1;
var result = [left, right];
var now = Math.abs(graph[left] + graph[right])
while (left < right) {
  let sum = graph[left] + graph[right];
  // console.log('sum: ', sum, left, right);
  if (Math.abs(sum) < now) {
    now = Math.abs(sum);
    result = [left, right];
    // console.log('result: ', result);
    
  }
  if (sum === 0) {
    break
  }

  if (sum < 0) {
    // 0보다 작다는건 left가 너무 음수로 크다
    left += 1;
  } else {
    right -= 1;
  }
}
console.log(graph[result[0]], graph[result[1]]);