const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');

const [A, B] = input[0].split(' ').map(Number);
result = 0;
op = [2, 1];
function bfs(start, end) {
  dq = [[start, 0]];

  while (dq.length > 0) {
    [start, ct] = dq.pop();

    if (start === end) {
      return ct;
    }
    for (let i = 0; i < 2; i++) {
      if (start < end) {
        if (i == 0) {
          dq.push([start * 2, ct + 1]);
        } else {
          dq.push([Number(String(start) + '1'), ct + 1]);
        }
      }
    }
  }
  return -1
}
if (bfs(A, B) === -1) {
  console.log(-1);
} else {
  console.log(bfs(A, B) + 1);
}
