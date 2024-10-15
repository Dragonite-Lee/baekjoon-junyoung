/*
1. 문제설명
- N * N 크기에 사탕 채워넣기 색은 같지 않을 수도 있음
- 색이 다른 인접한 두 칸 골라 교환
- 모두 같은 색인 열이나 행 먹음
2. 아이디어
- bfs로 하나씩 돌아보는데 상하좌우에 먼저 바꿀수 있는애가 있는지 나랑 다른애가 있는지 배열에 넣고
- 내자리에 그걸 하나씩 넣어보며 bfs를 진행 
- 최대값 갱신
3. 시간복잡도
*/
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .split('\n');
// console.log('input: ', input, arr);
const N = Number(input);
const graph = [];
// console.log(arr)
for (let i = 0; i < N; i++) {
  graph.push([...arr[i].split('')]);
}
// console.log(graph)
function maxCandyCount(arr) {
  let MAX = 0;

  for (let i = 0; i < N; i++) {
    let count = 0;
    let value = arr[i][0];
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === value) {
        count++;
      } else {
        MAX = Math.max(MAX, count);
        count = 1;
        value = arr[i][j];
      }

      if (j === N - 1) MAX = Math.max(MAX, count);
    }
  }

  for (let i = 0; i < N; i++) {
    let count = 0;
    let value = arr[0][i];
    for (let j = 0; j < N; j++) {
      if (arr[j][i] === value) {
        count++;
      } else {
        MAX = Math.max(MAX, count);
        count = 1;
        value = arr[j][i];
      }

      if (j === N - 1) MAX = Math.max(MAX, count);
    }
  }

  return MAX;
}

let max_result = maxCandyCount(graph);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N - 1; j++) {
    if (graph[i][j] !== graph[i][j + 1]) {
      [graph[i][j], graph[i][j + 1]] = [graph[i][j + 1], graph[i][j]];
      max_result = Math.max(maxCandyCount(graph), max_result);
      [graph[i][j + 1], graph[i][j]] = [graph[i][j], graph[i][j + 1]];
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N - 1; j++) {
    if (graph[j][i] !== graph[j + 1][i]) {
      [graph[j][i], graph[j + 1][i]] = [graph[j + 1][i], graph[j][i]];
      max_result = Math.max(maxCandyCount(graph), max_result);
      [graph[j + 1][i], graph[j][i]] = [graph[j][i], graph[j + 1][i]];
    }
  }
}

console.log(max_result);
