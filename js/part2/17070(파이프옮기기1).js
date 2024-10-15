/*
1. 문제설명
- 파이프가 1,1 1,2를 차지
2. 아이디어
- dfs처럼 하는데, 방향을 넣어서 가는 것 다르게 하기
- 가로 0 대각선 1 세로 2
3. 시간복잡도
- 16*16 + 16*16*4라 시간복잡도 Ok
*/
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var N = Number(input);
var map = arr.map((a) => a.split(' ').map(Number));
// console.log('map: ', map);

dx = [1, 1, 0];
dy = [0, 1, 1];
var result = 0;
function dfs(y, x, direction) {
  var cnt = 0;
  // console.log(y, x, direction);
  if (y === N && x === N) {
    cnt += 1;
    return cnt;
  }
  if (direction === 0) {
    for (let i = 0; i < 2; i++) {
      ex = dx[i] + x;
      ey = dy[i] + y;

      if (1 <= ex && ex < N + 1 && 1 <= ey && ey < N + 1) {
        if (i === 0) {
          if (map[ey - 1][ex - 1] === 0) {
            cnt += dfs(ey, ex, 0);
          }
        } else {
          if (
            map[ey - 1][ex - 1] === 0 &&
            map[ey - 2][ex - 1] === 0 &&
            map[ey - 1][ex - 2] === 0
          ) {
            cnt += dfs(ey, ex, 1);
          }
        }
      }
    }
  } else if (direction === 1) {
    for (let i = 0; i < 3; i++) {
      ex = dx[i] + x;
      ey = dy[i] + y;

      if (1 <= ex && ex < N + 1 && 1 <= ey && ey < N + 1) {
        if (i === 0) {
          if (map[ey - 1][ex - 1] === 0) {
            cnt += dfs(ey, ex, 0);
          }
        } else if (i === 1) {
          if (
            map[ey - 1][ex - 1] === 0 &&
            map[ey - 2][ex - 1] === 0 &&
            map[ey - 1][ex - 2] === 0
          ) {
            cnt += dfs(ey, ex, 1);
          }
        } else {
          if (map[ey - 1][ex - 1] === 0) {
            cnt += dfs(ey, ex, 2);
          }
        }
      }
    }
  } else if (direction === 2) {
    for (let i = 1; i < 3; i++) {
      ex = dx[i] + x;
      ey = dy[i] + y;

      if (1 <= ex && ex < N + 1 && 1 <= ey && ey < N + 1) {
        if (i === 1) {
          if (
            map[ey - 1][ex - 1] === 0 &&
            map[ey - 2][ex - 1] === 0 &&
            map[ey - 1][ex - 2] === 0
          ) {
            cnt += dfs(ey, ex, 1);
          }
        } else {
          if (map[ey - 1][ex - 1] === 0) {
            cnt += dfs(ey, ex, 2);
          }
        }
      }
    }
  }
  return cnt;
}

result += dfs(1, 2, 0);
console.log(result);
