/**
 * 7453 합이 0인 네 정수 투포인터
 * 문제설명
 * 정수로 이루어진 크기가 같은 배열 ABCD존재
 * Aa Bb Cc Dd의 합이 0인 abcd쌍의 개수를 출력해라
 * 아이디어
 * 배열의 크기는 4000 이므로 각각 포문돌리긴 너무 큼
 *
 * 시간복잡도
 */
const fs = require("fs");
const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input);
const A = [],
  B = [],
  C = [],
  D = [];
const sumMap = new Map();

// 1. 배열 4개로 분리하여 저장 O(N)
for (let i = 0; i < n; i++) {
  const [a, b, c, d] = arr[i].split(" ").map(Number);
  A.push(a);
  B.push(b);
  C.push(c);
  D.push(d);
}

// 2. A,B의 합의 경우의 수를 Map에 저장 O(N²)
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const sum = A[i] + B[j];
    sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
  }
}
console.log(sumMap);
// 3. C,D의 합이 -(A+B)인 경우 찾기 O(N²)
let result = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const sum = -(C[i] + D[j]);
    if (sumMap.has(sum)) {
      result += sumMap.get(sum);
    }
  }
}
console.log(result);
