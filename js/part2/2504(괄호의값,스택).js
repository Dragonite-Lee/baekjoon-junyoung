/*
1. 문제설명
- ( ) [ ] 기호에서 올바른 괄호열은 열리고 닫혀야함
- 괄호안엔 완성된 괄호가 들어있어야 함
- ()는 2 []는 3 (X)는 2* [Y]는 3*
- (XY)는 (X) + (Y)
- 입력이 올바르면 값을 아니면 0출력
2. 아이디어
- 스택 구조로 가기
- 점수제만 구현
3. 시간복잡도
- for문 1번이라 O(N)
*/

const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim().split('');

var stack = [];

for (i of input) {
  if (i === '(' || i === '[') {
    stack.push(i);
  } else {
    const element = stack.pop();
    if (element === '(' && i === ')') {
      stack.push(2)
    } else if (element === '[' && i === ']') {
      stack.push(3)
    } else if (!element || (element === '[' && i === ')') || (element === '(' && i === ']')) {
      stack.push(element)
      break;
    } else {
      var total = element
      while (true) {
        const element = stack.pop();
        if (isNaN(element)) {// 숫자가아님
          stack.push(element)
          break;
        } else {
          total += element
        }
      }
      const a = stack.pop();
      if (a === '(' && i === ')') {
        stack.push(2 * total)
      } else if (a === '[' && i === ']') {
        stack.push(3 * total)
      } else {
        stack.push('x')
      }
    }
  }
}

function sumArray(arr) {
  // 배열에 문자가 포함되어 있는지 확인
  const isAllNumbers = arr.every(item => typeof item === 'number');

  if (isAllNumbers) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    console.log(sum);
  } else {
    console.log(0);
  }
}

sumArray(stack)