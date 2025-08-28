/**
 * 6198 옥상 정원 꾸미기
 * 문제설명
 * N개의 빌딩이 있음 i번째 키가 hi이고 오른쪽으만 볼 수 있음
 * 즉, i번째 빌딩 관리인이 볼 수 있는 정원은 i+1, i+2 ..이다.
 * 근데 거기서도, 자기보다 높거나 같은게 있으면 그 다음부턴 못봄
 * 아이디어
 * 빌딩의 개수는 80,000이고 높이는 1000000000 까지
 * 확인할 수 있는 총 수를 구하는 것
 * 볼 수 있는 수를 배열로 정해놓고
 * 뒤에서 부터 시작하기
 * 근데 스택에서 제거를 할때가 중요
 * 시간복잡도
 *
 */

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);

const height = [];
for (let i = 0; i < N; i++) {
  height.push(Number(arr[i]));
}

const stack = [];
let result = 0;
for (let i = 0; i < N; i++) {
  while (stack.length > 0 && height[i] >= stack[stack.length - 1]) {
    stack.pop();
  }
  stack.push(height[i]);
  result += stack.length - 1;
}
console.log(result);
// 10 -> stack 10 -> 0
// 3 -> stack 10 3 -> 1
// 7 -> stack 10 7 -> 1
// 4 -> stack 10 7 4 -> 2
// 12 -> stack 12 -> 0
// 2 -> stack 12 2 -> 1
