/*
1. 문제설명
- N이 주어지면 N자리 신기한 소수 찾기
- 왼쪽부터 1 2 3 -- N까지 소수여야 함
2. 아이디어
- 앞자리를 소수로 무조건 시작
- 2357 각각을 넣고 123456789를 넣고 이런식으로 백트래킹?
*/

const fs = require('fs')
const input = fs.readFileSync('./js/input.txt').toString().trim()
const N = Number(input)

function recur(num) {
  if (num.length === N) {
    console.log(num)
    return
  }

  for (let i = 1; i < 10; i++) {
    a = Number(String(num) + String(i))
    if (is_prime(a)) {
      recur(a)
    }
  }
}

function is_prime(n) {
    if (n < 2) {
      for (let i = 2; i < Number(n**0.5)+1; i++) {
        if (n % i == 0) {
          return false
        }
      }
    }
    return true
  }