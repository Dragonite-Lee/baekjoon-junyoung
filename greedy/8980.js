/**
 * 문제설명
 * 직선도로에 왼쪽부터 오른쪽으로 1번부터 차례대로 번호가 붙여진 마을들이 있다.
 * 트럭은 본부에 있는데, 1번마을 왼쪽에 있다. 1번부터 마지막까지 오른쪽으로 가면서 물건을 배송한다.
 * 각 마을은 박스에 넣어 보내는데, 본부에서는 보내는 번호, 받는번호, 박스개수를 알고있음 -> 박스는 크기가 같음
 * 그리고 최대용량은 있음
 * 조건1 박스를 트럭에 실으면, 박스는 받는 마을에서만 내림
 * 조건2 트럭은 지나온마을로 되돌아가지 않음
 * 조건3 박스들 중 일부만 배송할수도 있음
 * 아이디어
 * 배송지가 가장 작은수부터 많이담아야 적게가서 다내리고 새로담을수있음
 * 배송지가 가까운순부터 담은다음에 다음목적지에 도착하면 현재배송지와같은것들제거
 * 싣을때 더빨리내리는데 더 많이 들고갈수있으면 있는거 버리기
 * 그리고 빠른 도착지의 택배를 싣는게 목표
 * 시간복잡도
 * N은 2,000, M은 10,000
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 마을수 N과 트럭의 용량 C
const [N, C] = input.split(" ").map(Number);
const M = Number(arr[0]);

const list = [];
for (let i = 1; i <= M; i++) {
  list.push(arr[i].split(" ").map(Number));
}
list.sort((a, b) => a[1] - b[1]);
const max_arr = Array(N + 1).fill(C);

let result = 0;

for (const [start, end, weight] of list) {
  let min_value = C;
  for (let i = start; i < end; i++) {
    if (min_value > Math.min(max_arr[i], weight)) {
      min_value = Math.min(max_arr[i], weight);
    }
  }
  for (let i = start; i < end; i++) {
    max_arr[i] -= min_value;
  }
  //   console.log("min_value: ", min_value);
  //   console.log("max_arr: ", max_arr);
  result += min_value;
}

console.log(result);
