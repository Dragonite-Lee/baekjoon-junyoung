const fs = require('fs');
const [...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const graph = [];
for (item of arr) {
  graph.push(item.split(' ').map(Number));
}

const paper = Array(6).fill(5);

function check(r, c, size) {
  for (let y = r; y < r + size; y++) {
    for (let x = c; x < c + size; x++) {
      if (0 <= y && y < 10 && 0 <= x && x < 10 && graph[y][x] === 1) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

function paper_put(r, c, size, method) {
  for (let y = r; y < r + size; y++) {
    for (let x = c; x < c + size; x++) {
      if (0 <= y && y < 10 && 0 <= x && x < 10) {
        graph[y][x] = method;
      }
    }
  }
}

let min_value = 26;

function dfs(cnt) {
  // console.log('cnt: ', cnt);
  if (cnt > min_value) {
    return;
  }
  let y = 0;
  let x = 0;
  let find = false;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (graph[i][j] === 1) {
        find = true;
        y = i;
        x = j;
        break;
      }
    }
    if (find) break;
  }

  if (!find) {
    min_value = Math.min(min_value, cnt);
    return;
  }
  if (graph[y][x] === 1) {
    for (let k = 5; k > 0; k--) {
      if (paper[k] > 0 && check(y, x, k)) {
        paper_put(y, x, k, 0);
        paper[k]--;
        dfs(cnt + 1);
        paper_put(y, x, k, 1);
        paper[k]++;
      }
    }
  }
}

dfs(0);
if (min_value === 26) {
  console.log(-1);
} else {
  console.log(min_value);
}
