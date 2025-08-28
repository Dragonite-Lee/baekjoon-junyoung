/** 12904 greedy A와 B
 * 문제설명
 * S를 T로 바꾸는 게임
 * 문자열을 바꿀 땐 2가지 연산이 가능하다
 * 문자열의 뒤에 A를 추가하기
 * 문자열을 뒤집고 뒤에 B를 추가하기
 * 이걸 이용해 S를 T로 만들 수 있는지 판단해라 가능하면 1 불가능하면 0
 * 아이디어
 * S는 999 T는 1000이고 T가 항상 크거나같음
 * 2의 제곱형태라 일반적으로 모든 수를 보는 것은 안됨
 * 거꾸로 가기 끝에가 a면 1번이고 a를 제외한게 전단계
 * 끝에가 b면 2번이고 b제외하고 뒤집은게 전단계
 * 시간복잡도
 */
const fs = require('fs');
let [S, T] = fs.readFileSync('./js/input.txt').toString().trim().split('\n');

// abba
// 거꾸로간다고ㅓ 생각하면 이건
// abb밖에 안됨 abba라 뒤집어서 b를 붙인게 아니니까
// 뒤집어서 b가 있으면 가능하겟지
// abb 는 ba가 될수잇음
// 뒤에 b면 뒤집은상태로 b를 붙인거니까
// ba는 b가 됨

const S_len = S.length;
function reverse(str_list) {
  let return_list = [];
  for (let i = str_list.length - 1; i >= 0; i--) {
    return_list.push(str_list[i]);
  }
  let return_str = return_list.join('');
  return return_str;
}

while (true) {
  if (S_len === T.length) {
    if (S === T) {
      console.log(1);
    } else {
      console.log(0);
    }
    break;
  }
  const T_arr = T.split('');
  const pop_el = T_arr.pop();
  if (pop_el === 'A') {
    T = T_arr.join('');
  } else {
    T = reverse(T_arr);
  }
}
