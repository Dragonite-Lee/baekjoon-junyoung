/**
 * 문제설명
 * 8개 톱니를 가진 톱니바퀴가 4개가 있음 N극또는 S극을 가짐
 * 톱니 회전은 한칸을 기준으로 한다.
 * 회전시키려면 회전시킬 톱니와 방향을 결정해야 한다.
 * 회전했는데 옆과 극이 다르면 옆에 애는 반대방향으로 회전하게 됨, 같으면 회전 안함
 * 아이디어
 * N극은 0 S극은 1
 * 회전시킬 톱니와 방향 1은 시계 -1은 반시계
 * 점수표에따라계산
 * 톱니4개를 배열로 만들고
 * 돌릴때마다 해당 톱니의 배열을 돌린 후, 나머지 배열과 연관관계살피기
 * 맞닿기 전에 같으면 안돌고 맞닿기 전에 달랐으면 돈다.
 * 시간복잡도
 */
const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('\n');
const wheels = [];
for (let i = 0; i < 4; i++) {
  wheels.push(input[i].split('').map(Number));
}
const K = Number(input[4]);
const order = [];
for (let i = 5; i < 5 + K; i++) {
  order.push(input[i].split(' ').map(Number));
}

function turnFunc(arr, d) {
  if (d === 1) {
    const temp = arr[7];

    for (let k = 7; k > 0; k--) {
      arr[k] = arr[k - 1];
    }

    arr[0] = temp;
    return arr;
  } else {
    const temp = arr[0];

    for (let k = 0; k < 7; k++) {
      arr[k] = arr[k + 1];
    }

    arr[7] = temp;
    return arr;
  }
}

for (let i = 0; i < K; i++) {
  const ture_wheel = order[i][0] - 1;
  const ture_direct = order[i][1];

  let right = ture_wheel + 1;
  let right_base = ture_wheel;
  let left = ture_wheel - 1;
  let left_base = ture_wheel;
  let ture_index = -ture_direct;
  let prev = wheels[right_base][2];
  while (right < 4) {
    if (prev !== wheels[right][6]) {
      wheels[right] = turnFunc(wheels[right], ture_index);
    } else {
      break;
    }
    if (ture_index > 0) {
      prev = wheels[right][3];
    } else {
      prev = wheels[right][1];
    }
    right += 1;
    right_base += 1;
    ture_index = -ture_index;
  }
  ture_index = -ture_direct;
  prev = wheels[left_base][6];
  while (left > -1) {
    if (prev !== wheels[left][2]) {
      wheels[left] = turnFunc(wheels[left], ture_index);
    } else {
      break;
    }
    if (ture_index > 0) {
      prev = wheels[left][7];
    } else {
      prev = wheels[left][5];
    }
    left -= 1;
    left_base -= 1;
    ture_index = -ture_index;
  }
  wheels[ture_wheel] = turnFunc(wheels[ture_wheel], ture_direct);
}
let result = 0;
for (let i = 0; i < 4; i++) {
  if (wheels[i][0] === 1) {
    result += 2 ** i;
    // console.log('result: ', result);
  }
}
console.log(result);
