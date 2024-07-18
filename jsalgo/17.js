/*
1. 아이디어
- 이진체크 함수를 만들어서 점검 필요한거 돌려서 반복문 넣기
*/

function solution(data) {
  var target_array = data[0].sort((a, b) => a - b);
  var find_array = data[1];
  var result = [];
  var mid = 0
  function binary_search(start, end, target) {
    if (start === end) {
      if (target_array[start] !== target) {
        result.push(target);
        return
      } else {
        return
      }
    }
    mid = Math.floor((start + end) / 2);
    if (target_array[mid] < target) {
      //내가 찾는게 오른쪽에 있는 경우
      binary_search(mid + 1, end, target);
    } else {
      binary_search(start, mid, target);
    }
  }

  for (let i = 0; i < find_array.length; i++) {
    binary_search(0, target_array.length, find_array[i]);
  }
  result.sort((a,b) => a-b)
  return result;
}
a = solution([
  [2, 4, 1, 7, 9, 8, 12],
  [2, 4, 8, 3, 6],
]);
console.log(a);
