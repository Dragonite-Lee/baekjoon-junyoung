/**
 * 문제설명
 * 크기가 N인 배열 A가 있다.
 * 배열에 있는 모든 수는 다르다.
 * 이 배열을 정렬하는데, 연속된 두 개의 원소만 교환할 수 있다.
 * 교환은 많아봐야 S번 할 수 있다.
 * 이때 정렬한 결과가 사전순으로 가장 뒷서는 것을 출력
 * 아이디어
 * N은 50보다 작거나 같은 자연수, S는 1,000,000보다 작거나 같은 음이아닌 정수
 * 소트한결과가 사전순으로 가장 뒤로 오려면 합쳤을 때 숫자가 제일 커야함
 * 어쨋든 앞에서부터 큰수가 와야하니까
 * 앞에서부터 S라는 범위내에서 제일 큰수를 찾아서 횟수를 소모해가며 스왑해서 가지고옴
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

const graph = arr[0].split(" ").map(Number);

let S = Number(arr[1]);

for (let i = 0; i < N; i++) {
  if (S === 0) {
    break;
  }
  let max_value = 0;
  let max_index = 0;
  // 내 인덱스에서 바꿀수있는 범위내에서 최대값 찾기
  for (let j = i; j <= i + S; j++) {
    if (graph[j] > max_value) {
      max_value = graph[j];
      max_index = j;
    }
  }

  // 끝애서부터 스왑하기
  for (let j = max_index; j > i; j--) {
    const big = graph[j];
    const small = graph[j - 1];
    graph[j] = small;
    graph[j - 1] = big;
    S -= 1;
  }
}
console.log(graph.join(" "));
