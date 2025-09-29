/**
 * 문제설명
 * 하루에 할 일이 N개가 있고, 1번부터 N번까지 차례대로 번호를 붙였다.
 * 끝내야할 시간과 걸리는 시간을 적은 명단을 만듬
 * i번째 일을 처리하는데 Ti시간이 걸리고 Si시 내에 이일을 처리하여야 하낟. 0시부터 활동가능하고, 두개이상의 일을 같은시간에 할 수 없음
 * 최대한 늦잠을 자는것 모두 마감시간 내에 처리할 수. 있는 범위 내에서 최대한 늦게 일을 시작할수있는 시간이 몇시인지 알아내기
 *
 * 아이디어
 * 최소시작시간 오름차, 소요시간이 작은거부터 오름차로 두고 현재시각에 하나씩 올리면서 시작 만약 더해진시각이 최소시간을 넘으면 -1출력 아니면 최초시간 출력
 * 근데 만약 위처럼해서 -1이 나오는데 더 일찍시작하면 되는게 있을수도 있으니까  0시부터 그냥 시작하고 일찍끝나면 젤 마지막 끝나는시간에서 빼기?
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
  const [a, b] = item.split(" ").map(Number);

  graph.push([b, a]);
}
graph.sort((a, b) => {
  return b[0] - a[0];
});
// console.log(graph);

let result = graph[0][0] - graph[0][1]; // -> 업무를 시작해야하는 최소 시간
// console.log("result: ", result);

for (let i = 1; i < N; i++) {
  // -> 최소시간보다 업무마감시간이 작으면 괜찮음 근데 업무시간이 최소시간이 더크면 갱신해야함  그래서 그걸 아우르는거가 음수면 -1
  if (graph[i][0] < result) {
    result = graph[i][0] - graph[i][1];
  } else {
    result -= graph[i][1];
  }
  //   console.log(result);
}
if (result >= 0) {
  console.log(result);
} else {
  console.log(-1);
}
// 2시 5시
// 5시 13시
// 13시 14시
// 14시 19시

// 2시엔시작 3시간소요
// 6시엔시작 8시간소요
// 15시엔시작 5시간소요
// 15시엔시작 1시간소요
// 0 1 4 10 20
// 10 13 3
// 16 22 6
// 19 21 2
// 20 20 0
// 0 10 16 19 20
// 13 7 4 3
