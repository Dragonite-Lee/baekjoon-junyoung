/**
 * 2565 전깃줄 dp
 * 문제설명
 * 남은 전깃줄이 교차하지 않게 하는 최소 개수 구하기
 * 아이디어
 * 전깃줄의 개수는 100이하
 * 교차한다는건 시작보다 큰데 끝점보다 작다는것
 * 젤많이 겹치는걸 제거한다는건 시작과 끝 차이가 크다?
 * 하나씩 temp에 넣고 넣게 되면 넣은 수를 le ri로 잡아서 안에있는거보다 Le ri가 커야함
 * 아니면 계속 c를 기준으로 제거를 반복하면서 갯수를 셈
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
const graph = [];
for (item of arr) {
  const [a, b] = item.split(' ').map(Number);
  const c = Math.abs(a - b);

  graph.push([a, b, c]);
}

let cnt = 0;
let result = 0;
let ci = 0;
while (cnt < N) {
  graph.sort((a, b) => a[0] - b[0]);
  console.log('graph: ', graph);
  let le = graph[ci][0];
  let ri = graph[ci][1];
  let ok = true;
  console.log(le, ri);
  for (let i = ci + 1; i < graph.length; i++) {
    if (graph[i][3] === false) {
      if (le > graph[i][0] || ri > graph[i][1]) {
        ok = false;
        ci = i;
        graph[i][3] = true
        result += 1;
        break;
      } else {
        le = graph[i][0];
        ri = graph[i][1];
      }
    }
  }
  //ok가 false 즉, 순서가 안맞음
  // if (!ok) {
  //   result += 1;
  //   graph.sort((a, b) => a[2] - b[2]);
  //   graph.pop();
  // }
  cnt += 1;
}
console.log(result);

graph.sort((a, b) => a[0] - b[0]);
let temp = []
for (let i = 0; i < N; i++) {
  temp.push(graph[i])
  let le = graph[i][0]
  let ri = graph[i][1]
  if (temp.length > 1) {
    for (let j = 0; j < temp.length; j++) { // 현재 넣는거보다 작은것들이랑 비교
      if (le > temp[j][0] || ri > temp[j][1]) { //

      }
    }
  }
}