/**
 * 문제설명
 * 연속된 줄을 그룹으로 선택하고, 각 줄의 앞에 탭을 추가하거나,
 * 삭제할 수 있다.
 * 줄의 개수 N과 각 줄의 앞에 있는 탭의 개수와 올바른 탭의 개수가 주어진다.
 * 한번 편집 시 연속된 줄을 그룹으로 선택한다. -> 선택된 줄의 앞에 탭 1개를 추가or삭제
 * 이 명령을 모두 수행하는게 하나의 편집임 선택된 줄의 개수와는 상관이 없음
 * 선택된 줄 중 단 하나라도 탭이없다면 삭제명령은 못함
 * 편집 횟수의 최솟값 구하기
 * 아이디어
 * 그룹지어서 늘리거나 줄이거나.. N은 1,000이하
 * 앞에서부터 목표값에 도달하는만큼 세기 근데 도달시점 +인지 -인지와 몇만큼 왔는지 세기
 * 전과 부호가 같으면 수를 안새다가 전이 간만큼을 넘어가면 숫자세기
 * 현재
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
const now_tab = arr[0].split(' ').map(Number);
const correct_tab = arr[1].split(' ').map(Number);
// console.log('correct_tab: ', correct_tab);
let total = 0;
let direct = '';
let prev_direct = '';
let cnt = 0; //이전 gap
for (let i = 0; i < N; i++) {
  let now_gap = now_tab[i] - correct_tab[i];
  if (now_gap < 0) {
    direct = '-';
    now_gap = Math.abs(now_gap);
  } else if (now_gap > 0) {
    direct = '+';
  } else {
    prev_direct = '';
    cnt = 0;
    continue;
  }
  // console.log(now_gap, direct)
  if (cnt === 0) {
    total += now_gap;
    prev_direct = direct;
    cnt = now_gap;
  } else {
    if (prev_direct !== direct) {
      total += now_gap;
      prev_direct = direct;
      cnt = now_gap;
    } else {
      //전과 방향이 같아 cnt만큼은 빼고올려도됨
      if (now_gap >= cnt) {
        total += now_gap - cnt;
        cnt = now_gap;
      } else {
        //근데 now_gap이 cnt보다 작게되면 같이올라갈수 없음 따라서 작은수로 갱신해야함
        cnt = now_gap;
      }
    }
  }
  // console.log(i, total, cnt, prev_direct);
}
console.log(total);
