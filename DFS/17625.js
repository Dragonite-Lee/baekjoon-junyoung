/**
 * 문제설명
 * 집에서 학교가는 길은 N*N바둑판 모양 임의의 숫자와 연산자를 넣었다.
 * 학교에서 집으로 가는 경로에 만나는 숫자와 연산자의 연산 결과로 최대 최소를 구하려고함
 * 1,1 에서 N,N까지 최단거리로 이동한다. 오른쪽과 아래쪽으로만 가능
 *
 * 아이디어
 * N은 3,5이고 홀수이다. 숫자는 0,5 정수고 연산자는 +, -, *이다.
 * 일단 재귀를 통한 dfs를 이용해 모든 경우의 수를 돌리면서 최대최소 갱신
 * parameter로 first second third를 조절
 *
 * 시간복잡도
 *
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
const graph = [];

for (item of arr) {
  graph.push(item.split(" "));
}

let min_result = 5000;
let max_result = -5000;

const dx = [1, 0];
const dy = [0, 1];

function dfs(y, x, first, second) {
//   console.log("y, x, first, second, third: ", y, x, first, second);
  if (y === N - 1 && x === N - 1) {
    min_result = Math.min(min_result, first);
    max_result = Math.max(max_result, first);
    return;
  }

  for (let i = 0; i < 2; i++) {
    const ny = dy[i] + y;
    const nx = dx[i] + x;
    if (0 <= ny && ny < N && 0 <= nx && nx < N) {
    //   console.log(ny, nx);
      if (second === "aaa") {
        graph[ny][nx];
        dfs(ny, nx, first, graph[ny][nx]);
      } else {
        let cal;
        const third = Number(graph[ny][nx]);
        if (second === "-") {
          cal = first - third;
          //   console.log("cal = first - third: ", (cal = first - third));
        } else if (second === "+") {
          cal = first + third;
          //   console.log("cal = first + third: ", (cal = first + third));
        } else {
          cal = first * third;
          //   console.log("cal = first * third: ", (cal = first * third));
        }
        dfs(ny, nx, cal, "aaa");
      }
    }
  }
}

dfs(0, 0, Number(graph[0][0]), "aaa");

console.log(max_result === -0 ? 0 : max_result, min_result === -0 ? 0 :min_result);
