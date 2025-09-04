/**
 * 문제설명
 * 정수삼각형이 주어진다.
 * 삼각형에서 아래로 내려올 때 한개를 택하는데 그 합이 최대가 되는 경로를 구해라
 * 아래층은 왼쪽 혹은 오른쪽 대각선만 선택 가능하다.
 * 아이디어
 * 젤 하위의 값부터 자기의 인덱스보다 1작거나 같은거랑 더해서 해당인덱스에 넣을때 큰값만 남김
 * 시간복잡도
 * 이중포문이라 n^2인데 500이라 250,000
 */
const fs = require("fs");

const [input, ...arr] = fs
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input);
const triangle = [];
for (let i = 0; i < n; i++) {
  triangle.push(arr[i].split(" ").map(Number));
}

const temp_arr = triangle[n - 1];
for (let i = n - 1; i > 0; i--) {
  const now_arr = triangle[i];
  const up_arr = triangle[i - 1];

  for (let j = 0; j < now_arr.length; j++) {
    let down = temp_arr[j];
    if (j === 0) {
      const up = up_arr[j];
      if (temp_arr[j] < down + up) {
        temp_arr[j] = down + up;
      }
    } else {
      const prev_up = up_arr[j - 1];
      if (temp_arr[j - 1] < down + prev_up) {
        temp_arr[j - 1] = down + prev_up;
      }
      const up = up_arr[j];
      if (temp_arr[j] < down + up) {
        temp_arr[j] = down + up;
      }
    }
  }
}
console.log(temp_arr[0]);
