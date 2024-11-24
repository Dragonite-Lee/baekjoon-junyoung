/**
 * 문제설명
 * 크기가 N*M인 지도 존재
 * 지도위에 주사위하나가 놓여있음
 * r,c로 지도좌표나타내며 r은 북쪽으로부터 거리 c는 서쪽으로부터 떨어진 개수
 * 주사위는 지도 위에 윗면이 1이고 동쪽을바라보는방향이 3인상태이며, 놓여져 있는좌표는 x,y이다
 * 처음엔 모든면이 0인데 이동한칸에 쓰인수가 0이면 복사되고 0이아니면 주사위의 바닥면에 복사되고 칸에 쓰인수는 0이 됨
 * 아이디어
 * 주사위의 면을 배열로 만들고 굴릴때 규칙찾기
 * 명령어에 따라 이동후,인덱스로 출력하는데 주사위를 굴릴때마다 index바뀜 해당 좌표와 주사위 좌표를 살핌
 * 논리관계에 따라 주사위의 숫자나 판의 숫자가 바뀌고
 * 주사위 상단을 출력 ->
 * 시간복잡도
 *
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

var [N, M, y, x, K] = input.split(' ').map(Number);
const graph = [];

for (let i = 0; i < N; i++) {
  graph.push(arr[i].split(' ').map(Number));
}
const order = arr[N].split(' ').map(Number);

const dx = [0, 1, -1, 0, 0];
const dy = [0, 0, 0, -1, 1];
const dice = [0, 0, 0, 0, 0, 0, 0];

for (let i = 0; i < order.length; i++) {
  // console.log(y, x);
  if (
    0 <= y + dy[order[i]] &&
    y + dy[order[i]] < N &&
    0 <= x + dx[order[i]] &&
    x + dx[order[i]] < M
  ) {
    y = y + dy[order[i]];
    x = x + dx[order[i]];
    if (order[i] === 1) {
      a = dice[1];
      b = dice[3];
      c = dice[4];
      d = dice[6];
      dice[1] = b;
      dice[3] = d;
      dice[4] = a;
      dice[6] = c;
    } else if (order[i] === 2) {
      a = dice[1];
      b = dice[3];
      c = dice[4];
      d = dice[6];
      dice[1] = c;
      dice[3] = a;
      dice[4] = d;
      dice[6] = b;
    } else if (order[i] === 3) {
      a = dice[1];
      b = dice[2];
      c = dice[5];
      d = dice[6];
      dice[1] = c;
      dice[2] = a;
      dice[5] = d;
      dice[6] = b;
    } else if (order[i] === 4) {
      a = dice[1];
      b = dice[2];
      c = dice[5];
      d = dice[6];
      dice[1] = b;
      dice[2] = d;
      dice[5] = a;
      dice[6] = c;
    }

    if (graph[y][x] === 0) {
      graph[y][x] = dice[6];
    } else {
      dice[6] = graph[y][x];
      graph[y][x] = 0;
    }
    // console.log(dice);
    console.log(dice[1]);
  } else {
    continue;
  }
}
