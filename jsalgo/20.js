/*
우선순위대로 출력하면서 그값에 해당되는걸 예산에서 빼기 그럴려면 정렬이 중요
*/

function solution(data) {
  var cut = data[1]
  var arr = []
  var index = 0
  var result = []
  for (let i = 0; i < data[0][0].length; i++) {
    arr.push([data[0][0][i], data[0][1][i], data[0][2][i]])
  }
  sorted_arr = arr.sort((a,b) => a[2] - b[2])
  console.log(sorted_arr[0][0])
  while (true) {
    if (cut >= sorted_arr[index][1]) {
      result.push(sorted_arr[index][0])
      cut -= sorted_arr[index][1]
      index += 1
    } else {
      break
    }
  }
  return result
 }
 
 
 a = solution([['딸기', '우유', '버터', '초콜릿 시나몬', '청포도', '생크림'], [120, 150, 130, 118, 126, 130], [6, 5, 4, 3, 2, 1], 100])
 console.log(a)