/**
 * 문제설명
 * N*N 크기의 땅이 있고, 나라가 하나씩 존재함
 * 인구이동은 하루동안 발생하고 인구이동이 없을때까지 지속된다.
 * 국경선을 공유하는 두나라의 인구차이가 L명이상 R명이하라면 국경선이 하루동안 열림 -> 인구이동 시작
 * 이동할수있으면 연합임
 * 연합을 이루고 있는 각 칸의 인구수는 연합의 인구수 / 칸개수 가 된다.
 * 연합해체하고 국경선 닫는다
 * 아이디어
 * 매번돌면서 상하좌우로 넘어가도 되는지 방문을 체크해가면서 배열에 넣는다
 * 이중배열에 넣어서 넣은것만큼 돌려서 합치기
 * 시간복잡도
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const N = input[0];
const L = input[1];
const R = input[2];
// console.log(N,L,R)
// console.log(arr)
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
let result = 0;

while (true) {
  
  let find = false;

  const available = Array.from({ length: N * N + 1 }, () => []);

  let cnt = 0;
  const visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      cnt += 1;
      if (visited[y][x] === false) {
        const dq = [];
        dq.push([y, x]);
        let first = true;
        visited[y][x] = true;
        while (dq.length > 0) {
          [ty, tx] = dq.pop();
          for (let i = 0; i < 4; i++) {
            ny = ty + dy[i];
            nx = tx + dx[i];
            if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
              if (visited[ny][nx] === false) {
                ab = Math.abs(arr[ty][tx] - arr[ny][nx]);
                if (ab >= L && ab <= R) {
                  if (first) {
                    available[cnt].push([ty, tx, arr[ty][tx]]);
                  }
                  first = false;
                  available[cnt].push([ny, nx, arr[ny][nx]]);
                  visited[ny][nx] = true;
                  dq.push([ny, nx]);
                }
              }
            }
          }
        }
      }
    }
  }

  for (let j = 0; j < available.length; j++) {
    if (available[j].length !== 0) {
      find = true;
      let sum = 0;
      let person = 0;
      for (item of available[j]) {
        sum += item[2];
        person += 1;
      }
      let people = Math.floor(sum / person);
    
      for (item of available[j]) {
        arr[item[0]][item[1]] = people;
      }
    }
  }

  if (find === false) {
    break;
  } else {
    result += 1;
  }
}
console.log(result);
