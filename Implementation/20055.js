/**
 * 문제설명
 * 길이가 N인 컨베이어벨트가 있다. 1 ~ N 돌아서 N+1 ~ 2N
 * 한칸;회전하면 1번부터 2번으로 N은 N+1로 2N은 1로 감
 * 각 칸은 내구도가 있다.
 * 1은 올리는 위치 N은 내리는 위치
 * 로봇을 올릴건데, 로봇은 올리는 위치에만 올릴 수 있다. 로봇은 내리는 위치에 항상내리고,
 * 로봇이 지나가면 내구도가 즉시 1감소한다.
 * 로봇이 내구도가 1이상있으면 움직이고 0이면 가만히 있는다.
 * 올리는 위치에 있는 칸의 내구도가 0이 아니면 올리는 위치에 로봇을 올린다.
 * 내구도가 0인 칸에 개수가 K개 이상이면 종료
 * 아이디어
 * 1. 벨트가 한칸씩 회전함
 * 2. 벨트가 회전하는 방향으로 로봇이 한칸씩 옮기는데, 옮길수잇으면 옮기고 아니면 가만히, 내리는 위치면 없애기
 * 3. 0에 로봇올리면서 (내구도1이상이면)1감소시키고
 * 4. 내구도0인개 K개이상이면 과정 종료
 * 시간복잡도
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.split(" ").map(Number);
const graph = arr[0].split(" ").map(Number);
const robot = Array(2 * N).fill(false);

let result = 0;
while (true) {
  // 1. 벨트가 한칸씩 회전함
  const graph_pop = graph.pop();
  graph.unshift(graph_pop);
  const robot_pop = robot.pop();
  robot.unshift(robot_pop);
  if (robot[N - 1] === true) {
    robot[N - 1] = false;
  }

  // 2. 벨트회전방향으로 로봇이 한칸씩 옮김
  for (let i = N - 2; i >= 0; i--) {
    if (robot[i] === true) {
      // 다음칸의 내구도가 1이상이거나 로봇이 없으면 옮길 수 있음 근데 만약 다음칸이 N-1이면 사라짐
      if (graph[i + 1] >= 1 && robot[i + 1] === false) {
        graph[i + 1] -= 1;
        robot[i] = false;
        if (i + 1 !== N - 1) {
          robot[i + 1] = true;
        }
      }
    }
  }

  // 3. 0에 로봇올리면서 감소
  if (graph[0] >= 1) {
    robot[0] = true;
    graph[0] -= 1;
  }
  result++;
  let count = 0;
  for (item of graph) {
    if (item === 0) {
      count++;
    }
  }
  if (count >= K) {
    console.log(result);
    break;
  }
}
