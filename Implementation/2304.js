/**
 * 문제설명
 * N개의 기둥들이 일렬로 세워져있다. 폭은 모두 1m이지만 높이는 다를 수 있다.
 * 기둥들을 이용해 양철로된 창고를 제작하려고 한다. 모든 기둥이 다들어가는데, 조건이잇다.
 * 1. 지붕은 수평부분 수직부분으로 구성되며 모두 연결됨
 * 2. 수평부분은 반드시 어떤기둥의 윗면과 닿아야함
 * 3. 수직부분은 반드시 어던기둥의 옆면과 닿아야함
 * 4. 지붕의 가장자리는 땅에 닿아야한다.
 * 5. 비가올때 물이 안고이게 오목하게 들어간 부분이 없어야한다.
 * 기둥들의 위치와 높이가 주어질때 가장 작은 창고다각형의 면적을 구해라
 *
 * 아이디어
 * 기둥의 개수 N (1, 1000)
 * N개의 줄에 왼쩍면의 위치를 나타내는 정수 L과 높이를 나타내는 H주어짐
 * 오목한 부분이 없으려면 높아졌다가 낮아지기만 해야함
 * 배열을 가로위치 순으로 정렬하고, 최고점을 찍기 그다음에 최고점까지의 넓이 최고점부터의 넓이구하기
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
const high = [];
let high_value = 0;
for (item of arr) {
  const [a, b] = item.split(" ").map(Number);
  if (b > high_value) {
    high_value = b;
    if (high.length > 0) {
      high.pop();
    }
    high.push([a, b]);
  }
  graph.push([a, b]);
}

graph.sort((a, b) => a[0] - b[0]);
// console.log(high);
let result = 0;
let up_value = 0;
let up_x = 0;
let down_value = graph[graph.length - 1][1];
let down_x = graph[graph.length - 1][0];

for (item of graph) {
  const [x, height] = item;

  if (x === high[0][0]) {
    result += (x - up_x) * up_value;
    break;
  }

  // 시작
  if (up_value === 0) {
    // 이전값 저장
    up_value = height;
    up_x = x;
  } else {
    // 높아진 상황
    if (up_value <= height) {
      result += (x - up_x) * up_value;
    //   console.log("result: ", result);
      up_value = height;
      up_x = x;
    } else {
      continue;
    }
  }
}

graph.sort((a, b) => b[0] - a[0]);

// console.log("result: 중간과정", result);
for (item of graph) {
  const [x, height] = item;
  if (x === high[0][0]) {
    // console.log("x: 걸림 ", x);
    if (x === down_x) {
      result += height;
    } else {
      result += (down_x - x - 1) * down_value;
      result += height;
    //   console.log("down_value1111111212: ", down_value);
    //   console.log("down_x - x: ", down_x - x);
    //   console.log("down_x: ", down_x);
    }
    break;
  }

  //젤 처음엔 자기의 값만 저장
  if (down_x === x) {
    result += down_value;

    // console.log("result:1111 ", result);
  } else {
    if (height === high[0][1]) {
      if (down_value !== height) {
        // console.log("down_value: 높이가다른데 처음진입 ", down_value);
        result += (down_x - x - 1) * down_value;
        // console.log("x: ", x);
        // console.log("down_x: ", down_x);
        result += height;
        down_value = height;
        down_x = x;
      }
    } else {
      if (down_value <= height) {
        result += (down_x - x - 1) * down_value;
        // console.log("down_value: ", down_value);
        // console.log("x: ", x);
        // console.log("down_x: 222", down_x);

        down_value = height;
        down_x = x;
        // console.log("result:끝자락 ", result, x);
        result += height;
      }
    }
  }
}
console.log(result);
