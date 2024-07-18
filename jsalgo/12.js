//완전 탐색 문제
/*
1. 아이디어 
- 완전 무식하게 모든 경우를 뽑쟈
- 근데 자기 고른 재료 옆의 재료는 못고름 
- 그럼 모든 경우를 골라낼 수 있게 만들어야 함
- 재귀함수 이용해서 모든 경우 push

2. 시간복잡도
- 이중반복문 n^2 재귀 n 으로 O(n^3)인데 최대가 8이므로 가능
*/

function solution(data) {

  result = []
  function conditionArr(arr, start, value, result) {
    if (start >= arr.length) {
      return
    }
    for (let i = start; i < arr.length; i++) {
      let newValue = value + arr[i]
      conditionArr(arr, i + 2, newValue, result)
      result.push(newValue)
    }
  }

  for (let j = 0; j < data.length; j++) {
    conditionArr(data, j, 0, result)
  }
  max_value = Math.max(...result)
  return max_value
}

const a = solution([2, 4, 1, 3, 5, 8, 8, 6]);
console.log(a);

