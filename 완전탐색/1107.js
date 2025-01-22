/**
 * 1107 리모콘
 * 문제설명
 * 버튼이 0부터 9까지 숫자와 +, -가 있다.  0에서 -누르면 변하지 않고 그대로임 위로는 무한대
 * 지금 이동하려고 하는 채널은 N이다. 어떤 버튼이 고장났는지 주어짐
 * N으로 가기 위해 최소한의 버튼 수 구하기 현재는 100번
 * 아이디어
 * N은 500,000
 * 내가 할수있는 행위는 버튼을 누르거나 +-를 누르거나
 * 일단 target에 해당하는 번호를 누르고 일의자리부터 고장난 버튼을 찾아 가장 가까운 수로 대치시키기
 * 일단 번호를 누르는게 빠른지 +-로 이동하는게 빠른지 판별해야함
 * 위처럼 번호눌러서 이동한거랑 그냥뺀거랑 작은걸 출력??
 * 시간복잡도
 * 그냥 브루트홀스로 모든 수에서 타겟넘버를 만드는 가장 작은 횟수 구하기
 */

const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const target = input;
// console.log("target: ", target);
const broken_cnt = Number(arr[0]);
// console.log("broken: ", broken);

// console.log("broken_arr: ", broken_arr);
let broken_arr;
if (broken_cnt) {
  broken_arr = arr[1].split(" ").map(Number);
} else {
  broken_arr = [-1];
}
// 젤 가깝게 target에 가는 법을 찾아야 함
let result = Math.abs(Number(target) - 100);

for (let i = 0; i < 1000001; i++) {
  for (let j = 0; j < String(i).length; j++) {
    if (broken_arr.includes(Number(String(i)[j]))) {
      break;
    } else if (j === String(i).length - 1) {
      result = Math.min(result, Math.abs(i - target) + String(i).length);
    }
  }
}

console.log(result);
