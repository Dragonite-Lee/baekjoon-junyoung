function solution(data) {
  var code = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
  }

  var result = 0
  for (let i = 0; i < data.length; i++) {
    var a = String.fromCharCode(data[i])
    result += code[a]
  }
  return result
}
// CVML
// 100 5 1000 50
// D V L I X
// 500 5 50 1 10
// 10 5 1
a = solution([68, 86, 76, 73, 88])
console.log(a)