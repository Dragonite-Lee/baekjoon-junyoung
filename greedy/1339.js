/**
 * 문제설명
 * 단어수학문제를 푸는 숙제
 * N개의 단어로 이루어져 있으며, 대문다임, 각 알파벳 대문자를 0~9까지 숫자 중 하나로 바꿔서 N개의 수를 합하는 문제
 * 같은 알파벳은 같은 숫자로 바꿔야 하며, 두 개 이상의 알파벳이 같은 수자면 안됨
 * 아이디어
 * 각 단어에 가중치를 매겨서 젤 큰애한테 9부터 매김
 * 가능한 이유는 가중치를 매길 때 자릿수 100 1000으로 매기니까 젤 앞에 있는애가 젤 클수밖에없음
 * 딕셔너리로 매긴 후 value값만 뽑아서 계산
 * 시간복잡도
 * 10 * 10
 */
const fs = require('fs');
const [input, ...arr] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input);

var dict = {};
for (word of arr) {
  let x = word.length - 1;

  for (s of word) {
    if (Object.keys(dict).includes(s)) {
      dict[s] += 10 ** x;
    } else {
      dict[s] = 10 ** x;
    }
    x -= 1;
  }
}
// console.log(dict);
var value_list = Object.values(dict).sort((a, b) => b - a);
let result = 0;
let num = 9;
for (item of value_list) {
  result += (item * num)
  num -= 1
}
console.log(result)