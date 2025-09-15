/**
 * 문제설명
 * 구멍을 레고조각 2개로 막아야하고, 구멍은 x센티미터인데
 * 레고 2조각의 길이의 합은 구멍의 너비와 정확하게 일치해야 함
 * 첫 줄엔 구멍의 너비 x, 다음엔 레고조각의수 n
 * 10 센티미터 (100,000,000 나노미터)
 *
 * 아이디어
 * 이진탐색 -> 내가 찾고자 하는 값을 하나의 리스트에서 빠르게 찾아내는 방법 logN
 * 일단 리스트를 정렬하고 for문안에서 이진탐색시작 -> n+nlogN
 * 차의 절대값이 젤 큰걸 출력해야함 1,000,000
 * 시간복잡도
 * n+nlonN
 */
/**
 * 문제설명
 * 구멍을 레고조각 2개로 막아야하고, 구멍은 x센티미터인데
 * 레고 2조각의 길이의 합은 구멍의 너비와 정확하게 일치해야 함
 * 첫 줄엔 구멍의 너비 x, 다음엔 레고조각의수 n
 * 10 센티미터 (100,000,000 나노미터)
 *
 * 아이디어
 * 이진탐색 -> 내가 찾고자 하는 값을 하나의 리스트에서 빠르게 찾아내는 방법 logN
 * 일단 리스트를 정렬하고 for문안에서 이진탐색시작 -> n+nlogN
 * 차의 절대값이 젤 큰걸 출력해야함 1,000,000
 * 시간복잡도
 * n+nlonN
 */
const readline = require("readline");

const rl = readline.createInterface({
  input: require('fs').readFileSync(''),
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  let currentIndex = 0;
  const arr_length = lines.length;

  while (true) {
    if (currentIndex >= arr_length) {
      break;
    }

    const x = Number(lines[currentIndex++]);
    const n = Number(lines[currentIndex++]);

    const list = [];
    for (let i = currentIndex; i < currentIndex + n; i++) {
      list.push(Number(lines[i]));
    }

    list.sort((a, b) => a - b);
    let find = false;
    for (let i = 0; i < list.length; i++) {
      let start = 0;
      let end = n - 1;
      const target = x * 10000000 - list[i];

      while (start < end) {
        if (target === list[end]) {
          if (end !== i) {
            console.log("yes", list[i], list[end]);
            find = true;
          }
          break;
        }
        const mid = Math.floor((start + end) / 2);

        if (list[mid] > target) {
          end = mid;
        } else {
          start = mid + 1;
        }
      }
    }

    if (find === false) {
      console.log("danger");
    }
    currentIndex += n;
  }
});