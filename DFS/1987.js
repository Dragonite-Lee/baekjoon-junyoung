/**
 * 1987 알파벳 dfs
 * 문제설명
 * 세로 R칸 가로 C칸으로 된 표 모양의 보드가 있음
 * 각 칸에는 대문자 알파벳이 하나씩 적혀 있고, 좌측 상단 1,1에 말이 놓여있음
 * 상하좌우 이동 가능한데, 새로 이동한 칸에 있는 알파벳은 지금까지 지나온 모든 칸의 알파벳과 달라야함
 * 말이 최대 몇칸 지날 수 있는지
 * 아이디어
 * R, C는 각각 20
 * 음 단순히 배열에 없는 알파벳을 가졌으면 이동하고 배열에 알파벳 새로넣기?
 * 검사를 배열에 넣고 include로 하게되면 시간초과가 나서
 * 비트마스킹으로 검사를 시작 
 * 알파벳이므로 charCodeAt으로 아스키코드로 변환후 65를빼서 0부터 26까지 만들어서 &로 0이면 방문안함으로 검사하고
 * dfs에 넣을땐 |로 방문 체크하기
 * 시간복잡도
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input.split(" ").map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split(""));
}
let result = 0;
function dfs(y, x, visited, cnt) {
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];
    if (0 <= ny && ny < R && 0 <= nx && nx < C) {
      let charBit = 1 << (graph[ny][nx].charCodeAt(0) - 65);
      if ((visited & charBit) === 0) {
        dfs(ny, nx, visited | charBit, cnt + 1);
      }
    }
  }
  result = Math.max(result, cnt);
}
dfs(0, 0, 1 << (graph[0][0].charCodeAt(0) - 65), 1);
console.log(result);
