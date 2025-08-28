/**
 * 가장 긴 증가하는 부분 수열5 14003
 * 문제설명
 * 수열A가 주어졌을때,
 * 가장 긴 증가하는 부분 수열 구하기 길이 출력
 */

const fs = require('fs');
const [input, arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
const graph = arr.split(' ').map(Number);

// 6
// 10 20 10 30 20 50

const result = [[-1000000001, -1]];
// 현재요소가 마지막요소보다 크면 그냫 넣고
// 안크면 해당 인덱스에 넣어버림
const ori = [];
function binary(st, en, target, le, index) {
  if (st === en) {
    if (st !== le - 1) {
      ori.push([st, result[st][0], result[st][1]]);
    }
    result[st][0] = target;
    result[st][1] = index;

    return;
  }
  const mid = Math.floor((st + en) / 2);
  if (result[mid][0] >= target) {
    binary(st, mid, target, le, index);
  } else {
    binary(mid + 1, en, target, le, index);
  }
}

for (let i = 0; i < N; i++) {
  const result_len = result.length;
  if (result[result_len - 1][0] < graph[i]) {
    result.push([graph[i], i]);
  } else {
    binary(0, result_len - 1, graph[i], result_len, i);
  }

  // console.log('result: ', result);
}
ori.sort((a, b) => a[2] - b[2]);

for (let i = 0; i < ori.length; i++) {
  let now = ori[i][0];
  let prev = now - 1;
  let next = now + 1;
  if (
    result[prev][1] < ori[i][2] &&
    result[prev][0] < ori[i][1] &&
    result[next][1] > ori[i][2] &&
    result[next][0] > ori[i][1]
  ) {
    result[now][0] = ori[i][1];
    result[now][1] = ori[i][2];
  }
}
// console.log(ori);
console.log(result.length - 1);
const new_arr = result.slice(1).map((e) => e[0]);
console.log(...new_arr);
// Input:
// 10
// -61 -28 -72 59 13 -21 84 -76 -52 -1

// Output:
// 4
// -76 -28 -21 -1

// Answer:
// 4
// -61 -28 -21 -1
