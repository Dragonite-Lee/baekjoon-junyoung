/**
 * 17609 회문
 * 문제설명
 * 한문자를 삭제해서 회문으로 만들수있으면 유사회문이라고 부름
 * summuus는 5번째나 6번째 u를 삭제하면 됨
 * 그자체 회문이면 0
 * 유사회문이면 1
 * 그외엔 2
 * 문자열의 개수 T와 문자열은 100,000길이
 * 아이디어
 * 어차피 포문 한번은 가능
 * 투포인터로 가로세로 구분해서 가기
 * 시간복잡도
 *
 */
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('./js/input.txt'),
  // input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const T = Number(input[0]);

  let index = 0;
  let result = [];
  while (index < T) {
    const str = input[index + 1];
    const str_arr = str.split('');
    // console.log('str_arr: ', str_arr);
    const str_length = str.length;
    // console.log('str_length: ', str_length);
    let left = 0;
    // console.log('left: ', left);
    let right = str_length - 1;
    let find = false;
    while (left < right) {
      // console.log('left,right: ', left, right);

      if (str_arr[left] === str_arr[right]) {
        // 둘다 같아서 ok
        left += 1;
        right -= 1;
      } else {
        if (left <= right - 1) {
          // 오른쪽 제거
          temp = str.slice(0, right) + str.slice(right + 1, str_length);
          if (temp === temp.split('').reverse().join('')) {
            result.push(1);
            find = true;
            break;
          }
        }
        if (left + 1 <= right) {
          // 왼쪽 제거
          temp = str.slice(0, left) + str.slice(left + 1, str_length);
          if (temp === temp.split('').reverse().join('')) {
            result.push(1);
            find = true;
            break;
          }
        }
        find = true;
        result.push(2);
        break;
      }
    }
    if (!find) {
      result.push(0);
    }
    index += 1;
  }
  console.log(result.join('\n'));
});
