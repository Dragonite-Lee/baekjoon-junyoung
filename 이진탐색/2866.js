/**
 * 문제설명
 * 테이블의 입력이 주어지는 모두 소문자이다.
 * 열을 위에서 아래로 읽어 하나의 문자열을 만들수있다.
 * 가장 위의 행을 지워도 테이블의 열을 읽어 중복이 되지 않는다면 가장 위의 행을 지우고 count 를 증가한다.
 * 동일한 문자열이 발견되면 count개수 출력
 * 아이디어
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

const [R, C] = input.split(" ").map(Number);
const graph = [];
for (item of arr) {
  graph.push(item.split(""));
}
let count = 0;
let start = 0;
let end = R - 1;

while (start <= end) {
  if (start === end) {
    const set_list = new Set();
    for (let x = 0; x < C; x++) {
      let str = "";
      for (let y = end; y < R; y++) {
        str += graph[y][x];
      }
      set_list.add(str);
    }
    if (set_list.size < C) {
      count = end - 1;
    } else {
      count = end;
    }
    break;
  }
//   console.log("end: ", end);
//   console.log("start: ", start);
  const mid = Math.floor((start + end) / 2);
  //   console.log("mid: ", mid);
  const set_list = new Set();
  for (let x = 0; x < C; x++) {
    let str = "";
    for (let y = mid; y < R; y++) {
      str += graph[y][x];
    }
    set_list.add(str);
  }

  if (set_list.size < C) {
    // 중복된게 발견됨 즉 count를 줄여여함
    end = mid;
  } else {
    start = mid + 1;
  }
  // console.log('set_list.size: ', set_list.size);
}
console.log(count);
