/**
 * 문제설명
 * 길이가 N인 수식이 있다 0보다 크거나 같고 9보다 작거나 같은 정수와 연산자 + - *로 이루어짐 연산자 우선순위는 동일해서 오니쪽부터 순서대로 계산
 * 수식에 괄호가 추가되면 괄호부터 계산해야함 단, 괄호안에는 연산자가 하나만 들어있어야함
 * 또한 괄호안엔 괄호가 들어갈 수 없음
 * 수식이 주어졌을 때 괄호를 적절히 추가해 식을 최대로 만들어라 괄호 개수의 제한은 없고 추가하지 않아도 됨
 * 수식의 길이는 19까지 가능 수식의 정수는 모두 0 ~ 9 사이이다.
 * 아이디어
 * 모든 경우를 계산하는 건 불가능하다고 생각해서 dfs를 이용?? 앞에서부터 하냐 안하냐로 들어가기
 * 하는거면 괄호값계산해서 리스트에 넣기
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
const list = arr[0].split("");

function operation(char, num1, num2) {
  if (char === "+") {
    return num1 + num2;
  } else if (char === "-") {
    return num1 - num2;
  } else {
    return num1 * num2;
  }
}
const num = [];
const op = [];

for (let i = 0; i < N; i++) {
  if (i % 2 === 0) {
    num.push(Number(list[i]));
  } else {
    op.push(list[i]);
  }
}

const num_size = num.length - 1;
let result = -1000000000000000;

function dfs(idx, now_num) {
  // 종료조건
  if (idx >= num_size) {
    result = Math.max(result, now_num);
    // console.log("now_num: ", now_num);
    return;
  }

  // 괄호를 안하는 경우
  dfs(idx + 1, operation(op[idx], now_num, num[idx + 1]));

  if (idx + 2 <= num_size) {
    const temp = operation(op[idx + 1], num[idx + 1], num[idx + 2]);
    // console.log("temp: ", temp);
    dfs(idx + 2, operation(op[idx], now_num, temp));
  }
  return;
}

dfs(0, num[0]);
console.log(result);
