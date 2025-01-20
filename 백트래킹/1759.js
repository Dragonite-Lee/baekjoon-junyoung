/**
 * 1759 암호만들기 백트래킹
 * 문제설명
 * 서로 다른 L개의 알파벳 소문자로 구성되어 최소 한개의 모음과 최소 두개의 자음으로 구성되어 있음
 * 증가하는 식으로 구성 abc
 * 문자의 종류가 C가지가 있다면 가능성있는 암호를 구해라
 * 아이디어
 * L과 C는 3~15
 * 조건은 C개의 문자중에 1개의 모음과 2개의 자음이 있어야함
 * depth를 가지고 백트래킹
 * depth가 L이면 출력하고 리턴
 * 대신 모음1개 자음2개가 들어가는지 확인해야함
 * 시간복잡도
 *
 */
const fs = require("fs");
const [input, arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [L, C] = input.split(" ").map(Number);
// console.log("L, C: ", L, C);
const num_arr = arr.split(" ");
// console.log("arr: ", num_arr);
let result = [];
function back_tracking(start, str_arr, cond1, cond2, depth) {
  // console.log(str_arr)
  // console.log(
  //   "start, str_arr, cond1, cond2, depth: ",
  //   start,
  //   str_arr,
  //   cond1,
  //   cond2,
  //   depth
  // );
  if (depth === L) {
    if (cond1 >= 1 && cond2 >= 2) {
      const new_arr = [...str_arr];
      new_arr.sort();
      result.push(new_arr.join(""));
    }
    return;
  }

  for (let j = start; j < C; j++) {
    if (["a", "e", "i", "o", "u"].includes(num_arr[j])) {
      str_arr.push(num_arr[j]);
      back_tracking(j + 1, str_arr, cond1 + 1, cond2, depth + 1);
      str_arr.pop();
    } else {
      str_arr.push(num_arr[j]);
      back_tracking(j + 1, str_arr, cond1, cond2 + 1, depth + 1);
      str_arr.pop();
    }
  }
  return;
}

for (let i = 0; i < C; i++) {
  // console.log("---------------시작=------")
  if (["a", "e", "i", "o", "u"].includes(num_arr[i])) {
    back_tracking(i + 1, [num_arr[i]], 1, 0, 1);
  } else {
    back_tracking(i + 1, [num_arr[i]], 0, 1, 1);
  }
}

result.sort();
for (item of result) {
  console.log(item);
}
