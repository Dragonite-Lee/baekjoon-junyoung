/*
1. 문제설명
- 주어질 숫자의 양과 리스트 주면 소수찾기
2. 아이디어
- 각 소수마다 자기보다 작은수 반복문해서 1이랑 자기자신빼고 다른걸로 나눴을 때 나머지가 0이면 안됨
3. 시간복잡도
- 100이하의 갯수와 자연수 1000으로 이중for문인데 100,000 가능
*/

const fs = require('fs');
const [N, ...k] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var arr = k[0].split(' ');
function re(a) {
  if (a == 1) {
    return false
  }
  for (let i = 2; i < a + 1; i++) {
    if (i !== a && a % i == 0) {
      return false;
    }
  }
  return true;
}
var result = 0;
for (let i = 0; i < N; i++) {
  // console.log(re(Number(arr[i])));
  if (re(Number(arr[i])) == true) {
    result += 1;
  }
}
console.log(result);
