/**
 * 문제설명
 * 두종류의 부등호 < > 가 나열된 순서열 A가 있다.
 * 부등호 앞뒤에 서로 다른 한 자릿수 숫자를 넣어서 모든 부등호관계를 만족시키려 함
 * 만족시킨 다음 부등호를 제거해 이어붙인게 부등호정수
 * 최대값과 최소값을 찾기
 *
 * 아이디어
 * 맥스는 0~9까지 와야함 즉 10!의 시간복잡도  -> 3.600.000정도 즉 for문을 이용한 백트래킹 가능
 * 시간복잡도
 *
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const k = Number(input);
const graph = arr[0].split(" ");

let max_result = -1;
let max_value = "";
let min_result = 10000000001;
let min_value = "";
const graph_depth = graph.length;
function back_tracking(depth, now) {
  //   console.log("depth, now: ", depth, now);
  // depth 가 배열의 길이가 되면 모든 수를 넣은 것
  if (depth === graph_depth + 1) {
    const number = now.join("");
    if (max_result < number) {
      max_result = number;
      max_value = String(now.join(""));
    }

    if (min_result > number) {
      min_result = number;
      min_value = String(now.join(""));
    }
    return;
  }
  for (let i = 9; i >= 0; i--) {
    if (depth === 0) {
      now.push(i);
      back_tracking(depth + 1, now);
      now.pop();
    } else {
      // now에없는 수로 부등호를 만족하는 수를 넣어야함
      if (!now.includes(i)) {
        if (graph[depth - 1] === ">") {
          if (now[depth - 1] > i) {
            now.push(i);
            back_tracking(depth + 1, now);
            now.pop();
          }
        } else if (graph[depth - 1] === "<") {
          if (now[depth - 1] < i) {
            now.push(i);
            back_tracking(depth + 1, now);
            now.pop();
          }
        }
      }
    }
  }
  return;
}

back_tracking(0, []);

console.log(max_value);
console.log(min_value);
