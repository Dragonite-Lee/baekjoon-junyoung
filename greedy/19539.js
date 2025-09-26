/**
 * 문제설명
 * 사과나무를 1번부터 N번까지 심었다. 초기높이는 모두 0이다.
 * 물뿌리개 2개를 준비했다. 나무하나를 1만큼 성장시키고, 하나는 2만큼성장한다.
 * 물뿌리개는 한번에 사용해 3만큼도 가능하다.
 * 사과나무 높이의 배치를 맞추려고함 가능한지 여부 판단하기
 * 아이디어
 * 물을 뿌리는 방법은 3가진데, 나무들의 총합이 3의배수가 되어야함
 * 2만큼 자라나는 물뿌리개를 사용하는 횟수가 총일수보다 같거나 커야함 -> 남은거에서 결국2만큼못뿌리면 높이를 못맞춘다는것
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
const list = arr[0].split(" ").map(Number);

if (list.reduce((a, b) => a + b, 0) % 3 === 0) {
  let cnt = 0;
  for (tree of list) {
    cnt += Math.floor(tree / 2);
  }
  if (cnt >= Math.floor(list.reduce((a, b) => a + b, 0) / 3)) {
    console.log("YES");
  } else {
    console.log("NO");
  }
} else {
  // 3의배수가 아니라면 맞출수없음
  console.log("NO");
}
