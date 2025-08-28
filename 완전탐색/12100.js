/**
 * 12100 2024 완전탐색
 * 문제설명
 * 2024게임 최대5번 이동 후 가장 큰 블록의 크기 출력
 * 아이디어
 * 각각 움직이는 함수 만들고 완전 탐색
 * 위쪽 방향으로 올린다고 할 때 순서는
 * 위로 정렬하면서 합치기?
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
  graph.push(item.split(' ').map(Number));
}

function move(arr, dir) {
  if (dir === 0) {
    // 북쪽
    for (let x = 0; x < N; x++) {
      let top = 0;
      for (let y = 1; y < N; y++) {
        if (arr[y][x] !== 0) {
          let temp = arr[y][x];
          arr[y][x] = 0;
          if (arr[top][x] === 0) {
            arr[top][x] = temp;
          } else if (arr[top][x] === temp) {
            arr[top][x] = temp * 2; //합쳐진 경우라 또 합쳐질 수 없기때문에 top증가
            top += 1;
          } else {
            top += 1;
            arr[top][x] = temp;
          }
        }
      }
    }
  } else if (dir === 1) {
    // 남쪽
    for (let x = 0; x < N; x++) {
      let bot = N - 1;
      for (let y = N - 2; y >= 0; y--) {
        if (arr[y][x] !== 0) {
          let temp = arr[y][x];
          arr[y][x] = 0;
          if (arr[bot][x] === 0) {
            arr[bot][x] = temp;
          } else if (arr[bot][x] === temp) {
            arr[bot][x] = temp * 2;
            bot -= 1;
          } else {
            bot -= 1;
            arr[bot][x] = temp;
          }
        }
      }
    }
  } else if (dir === 2) {
    // 동쪽
    for (let y = 0; y < N; y++) {
      let right = N - 1;
      for (let x = N - 2; x >= 0; x--) {
        if (arr[y][x] !== 0) {
          let temp = arr[y][x];
          arr[y][x] = 0;
          if (arr[y][right] === 0) {
            arr[y][right] = temp;
          } else if (arr[y][right] === temp) {
            arr[y][right] = temp * 2;
            right -= 1;
          } else {
            right -= 1;
            arr[y][right] = temp;
          }
        }
      }
    }
  } else {
    // 서쪽
    for (let y = 0; y < N; y++) {
      let left = 0;
      for (let x = 1; x < N; x++) {
        if (arr[y][x] !== 0) {
          let temp = arr[y][x];
          arr[y][x] = 0;
          if (arr[y][left] === 0) {
            arr[y][left] = temp;
          } else if (arr[y][left] === temp) {
            arr[y][left] = temp * 2;
            left += 1;
          } else {
            left += 1;
            arr[y][left] = temp;
          }
        }
      }
    }
  }
  return arr;
}

// 0 1 2 3 북 남 동 서
let result = 0;
function dfs(board, cnt) {
  if (cnt === 5) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        result = Math.max(result, board[y][x]);
      }
    }
    return;
  }
  for (let i = 0; i < 4; i++) {
    let new_board = board.map((v) => [...v]); // 파라미터에서 받아온 걸로만 영향을 받게끔 갱신해야함
    let temp_board = move(new_board, i);
    dfs(temp_board, cnt + 1);
  }
}
dfs(graph, 0);
console.log(result);
