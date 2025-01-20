/**
 * 문제설명
 * 박스는 N개가 있고, 카드는 색상으로 구분
 * 서로 다른 색상 M개 존재
 * 박스 최대 1개는 조커박스 이는 색이 다른 카드를 보관해도 됨
 * 조커박스를 제외한 나머지는 비어있거나, 같은 색의 카드만 보관
 * 같은 색을 가진 모든 카드는 모두 같은 박스에 있어야 함 (조커박스에 있는건 예외)
 * 최소 몇 번 이동해서 위의 조건을 만족하는지
 * 이동1번은 꺼내서 넣기까지임
 * 아이디어
 * 상자들을 기준으로 for문
 * 만약 두 가지 이상의 색이면 조커 리스트에 넣기
 * 한 가지 색만 있으면 one 리스트에 넣기
 * 이때, 한가지 색의 번호를 배열 인덱스로 1씩 더해가며 넣기
 * 조커 리스트가 있다면 갯수-1
 * one 리스트에 중복되는 요소들 만큼 더하기
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.split(' ').map(Number);
const box = [];
for (let i = 0; i < N; i++) {
  box.push(arr[i].split(' ').map(Number));
}
// console.log(box);
const joker_list = [];
const one_list = Array(51).fill(0);
// console.log('one_list: ', one_list);

for (let i = 0; i < N; i++) {
  let first = 0;
  let one = false;
  let no = true;
  for (let j = 0; j < M; j++) {
    if (box[i][j] !== 0) {
      // console.log(one);
      no = false;
      if (first === 0) {
        // console.log(i, j);
        first = j+1;
      } else {
        // console.log(i, j);
        joker_list.push(i + 1);
        one = true;
        break;
      }
    }
    // console.log(one);
  }
  // console.log(one);
  if (one === false && no === false) {
    one_list[first] += 1;
  }
}
// console.log(joker_list);
// console.log(one_list);
let jung = 0;
for (let i = 1; i < 51; i++) {
  if (one_list[i] > 1) {
    jung += one_list[i] - 1;
  }
}
let result = 0;
// console.log(jung)
if (joker_list.length !== 0) {
  result = jung + joker_list.length - 1;
} else {
  if (jung !== 0) {
    result = jung - 1;
  }
}

console.log(result);
   