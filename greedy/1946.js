/**
 * 문제설명
 * 1차 서류와 2차 면접으로 인재선발이 이루어진다.
 * 다른 모든 지원자들과 비교해 서류와 면접중 적어도 하나가 다른 지원자보다 떨어지지 않는 자만 선발
 * 즉, A가 B에 비해 성적이 2개다 떨어진다면 A는 결코 선발되지 않음
 * 선발가능한 최대 인원수를 구해라
 * 아이디어
 * T는 1 ~ 20, N은 1 ~ 100,000
 * 뽑힌자중에선 서로 나은게 1개라도 있어야 함
 * 서류를 기준으로 정렬하고 하나씩 넣으면서 면접이 높은애들만 넣기
 * 시간복잡도
 * 정렬 시간복잡도 logn에 반복문 n과 length는 1이라 이라 T(n + logn)
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input);

let round = 0;
let index = 0;

while (round < T) {
  const N = Number(arr[round + index]);
  const grade_arr = [];
  for (let i = 0; i < N; i++) {
    const [a, b] = arr[i + index + round + 1].split(" ").map(Number);
    grade_arr.push([a, b]);
  }

  grade_arr.sort((a, b) => a[0] - b[0]);

  let count = 1;
  let last_grade = grade_arr[0][1];
  for (item of grade_arr) {
    if (item[1] < last_grade) {
      count++;
      last_grade = item[1];
    }
  }
  console.log(count);

  index += N;
  round++;
}
