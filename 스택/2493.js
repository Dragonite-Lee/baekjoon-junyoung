/**
 * 2493 탑 스택
 * 문제설명
 * N개의 높이가 서로 다른 탑을 수평 직선의 왼쪽부터 오른쪽으로 차례로 세움
 * 그리고 레이저 발사하는데, 지표면과 평행하게 수평직선의 왼쪽 방향으로 발사
 * 하나의 탑에서 발사된 신호는 가장 먼저 만나는 단 하나의 탑에서만 수신 가능
 * 처음부터 수신하는 탑의 번호를 출력
 * 아이디어
 * pop한거보다 크면 pop한건 안 집어넣음
 * 작으면 집어넣음
 * 시간복잡도
 */

const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);
const graph = arr[0].split(' ').map(Number);

const stack = [];
const result = [];
for (let i = 1; i < N + 1; i++) {
  if (stack.length === 0) {
    stack.push([graph[i - 1], i]);
    result.push(0);
  } else {
    let now_pop;

    while (true) {
      now_pop = stack.pop();

      if (now_pop[0] > graph[i - 1]) {
        stack.push(now_pop);
        stack.push([graph[i - 1], i]);
        result.push(now_pop[1]);
        break;
      } else {
        if (stack.length > 0) {
          continue;
        } else {
          stack.push([graph[i - 1], i]);
          result.push(0);
          break;
        }
      }
    }
  }
  // console.log('stack', stack);
}
console.log(...result);
// [6,1] [9,2] [7,4]
// 0 0
// 0는 stack.pop()인 6보다 크니까 넣고 0
// 5는 stack.pop()인 9보다 작으니까 인덱스뽑고 인덱스반환
// 7은 stack.pop()인 5보다 크니까 한번더 pop()는 9 인덱스반환
// 큐에없네
// 6,1 넣음
// 큐에있네? 뽑음
// 6,1
// 6 > 9 아니네
// 스택에 비었으니까
// 9,2 넣고 while종료
// 큐에있네? 뽑음
// 9,2
// 9 > 5 ㅇㅋ
// 9,2 넣고 5,3 넣고
// result엔 2 넣음
// 스택에 있네
// 뽑음
// 5,3
// 5 > 7? 아니네
// 9,2
// 9 > 7 맞네
// 9,2넣고 7,4넣고
// result 엔 2넣음
// 있으니까뽑
// 7> 4 4
