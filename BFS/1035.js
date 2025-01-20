/**
 * 문제설명
 * 최대 5개의 조각이 있는 5*5 크기의 보드가 있음
 * 조각을 적절히 움직여 모든조각이 연결 요소를 이루게 하려함
 * 상하좌우로 인접한 조각을 모두 연결했을 때,
 * 모든 쌍의 조각이 적어도 하나의 경로로 연결되어야 함
 * 최소 몇번 움직이는지? . : 빈곳, * : 조각(1~5)
 * 아이디어
 * 1. 조합으로 말의 갯수가 25개의 칸중 있을 수 있는 위치 찾기.
    1. 여기서 칸12345에 고유번호 붙이기
2. bfs로 돌아서 붙어있는지 확인 
    1. 이중포문돌다가 만난애가 돌고나온 return값이 총갯수와 같아야 함
3. 같으면 4로 아니면 1로
4. 1234가 원래위치인1234와의 거리차중 젤 최소값을 갱신 12개정도?
    1. 있을 수 있는 위치를 순열로 리스트로 뽑아내서 그 리스트랑 원래좌표랑 거리차 비교해서 최소값 갱신?
 * 시간복잡도
 *
 */
const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
let graph = [];
for (arr of input) {
  graph.push(arr.split(''));
}

let position = [];
let now = [];
let start_count = 0;
for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 5; x++) {
    position.push([y, x]);
    if (graph[y][x] === '*') {
      now.push([y, x]);
      start_count += 1;
    }
  }
}
// console.log(now);
// console.log(position, start_count);
function combination(items, idx, arr, k, result) {
  if (items.length === k) {
    result.push([...items]);
    return;
  }

  for (let i = idx; i < arr.length; i++) {
    combination([...items, arr[i]], i + 1, arr, k, result);
  }
}

let result = [];
combination([], 0, position, start_count, result);

function bfs(y, x, map, visited) {
  let cnt = 1;
  let qu = [];
  qu.push([y, x]);
  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];
  visited[y][x] = true
  while (qu.length > 0) {
    [ey, ex] = qu.shift();
    for (let i = 0; i < 4; i++) {
      let ny = dy[i] + ey;
      let nx = dx[i] + ex;

      if (0 <= ny && ny < 5 && 0 <= nx && nx < 5) {
        if (map[ny][nx] === true && visited[ny][nx] === false) {
          qu.push([ny, nx]);
          cnt += 1;
          visited[ny][nx] = true;
        }
      }
    }
  }
  return cnt;
}

function permutate(items, arr, k, result) {
  if (items.length === k) {
    result.push(items);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    permutate(
      [...items, arr[i]],
      arr.filter((v) => v !== arr[i]),
      k,
      result
    );
  }
}
let min_cnt = 52500;
for (item of result) {
  let new_map = Array.from(Array(5), () => Array(5).fill(false));
  
  let start = [];
  for (s of item) {
    new_map[s[0]][s[1]] = true;
    start.push([s[0], s[1]]);
  }
  // console.log(start)
  let visited = Array.from(Array(5), () => Array(5).fill(false));
  if (bfs(start[0][0], start[0][1], new_map, visited) === start_count) {
    let permu = [];

    permutate([], item, start_count, permu);
    // console.log('permu: ', permu);
    
    for (let k = 0; k < permu.length; k++) {
      let cnt = 0;
      for (let j = 0; j < permu[k].length; j++) {
        cnt += Math.abs(now[j][0] - permu[k][j][0]);
        cnt += Math.abs(now[j][1] - permu[k][j][1]);
      }
      min_cnt = Math.min(min_cnt, cnt);
    }
    
  }
}
console.log(min_cnt);
