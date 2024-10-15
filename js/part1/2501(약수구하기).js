/*
1. 문제설명 
- 두개의 자연수 N K주어짐 N의 약수들 중 K번째로 작은 수를 출력
- N의 약수갯수가 K보다 적어서 K번째가 존재하지 않으면 0출력
2. 아이디어
- 단순 for문으로 N까지 나눠서 나머지가 0인지 검사하고 index로 번호 표시해서 k와 같을때 리턴
3. 시간복잡도
- N은 1이상 10,000이하라 단순for문 가능
*/

const fs = require("fs");
const input = fs.readFileSync("./js/input.txt").toString().trim().split(" ");

var index = 0;
var cnt = 1;

while (Number(input[0]) >= cnt) {
  if (Number(input[0]) % cnt === 0) {
    index += 1
    if (index === Number(input[1])) {
      console.log(cnt)
      break
    }
  }
  cnt += 1
}

if (index < Number(input[1])) {
  console.log(0)
}
