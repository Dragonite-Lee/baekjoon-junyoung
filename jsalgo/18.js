/*
1. 아이디어
- 같은 수의 종은 가나다 순
- 일단 수대로 배열을 만들까?
- 일단 객체로 계싼을 하고
- 객체의 키벨류로 쌍으로 배열을 만들고 그걸로 정렬
*/
function solution(data) {
  var obj = {}
  for (let i = 0; i < data[0].length; i++) {
    if (obj[data[0][i]]) {
      obj[data[0][i]] += data[1][i]
    } else {
      obj[data[0][i]] = data[1][i]
    }
  }
  var sorted_arr = []
  var result = []
  // console.log(obj)
  for (const [key, value] of Object.entries(obj)) {
    sorted_arr.push([key, value])
  }
  sr = sorted_arr.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]); // 숫자가 같으면 문자열 비교
    } else {
      return b[1] - a[1]; // 숫자가 다르면 숫자 비교
    }
  })
  // console.log(sr)
  for (data of sr) {
    result.push(data[0])
  }
  return result
}

a = solution([["코리안숏헤어", "코리안숏헤어", "메인쿤", "벵갈", "메인쿤", "브리티시숏헤어", "노르웨이숲" ], [30, 15, 13, 4, 45, 9, 21]])