/**
 * 10942 팰린드롬 dp
 * 문제설명
 * N개의 자연수를 칠판에 적고, 질문을 M개 함
 * 각질문은 두 정수 S, E로 나타내며 S번째수부터 E번째수까지 팰린드롬을 이루는지 물어보며 맞다아니다 대답
 * 팰린드롬은 높아지다가 낮아져야함 즉 전수보다 작아지면 앞으로도 작아져야함
 * 아이디어
 * 일단 생각난건 질문개수만큼 돌면서 펠린드롬인지 확인?
 * 시간초과일듯 1,000,000 * 2,000 라서
 * dp?
 * 
 * 시간복잡도
 */
// 1 2 1 3 1 2 1
// 1 3
// s-1부터 E까지 반복문 돌건데
// dp는 0으로되게 만들어놓고
// 0 0 0 0 0 0 0
// 1 2 1 3
const fs = require('fs');
const rl = require('readline').createInterface({
  // input: process.stdin,
  input: fs.createReadStream('./js/input.txt'),
  output: process.stdout,
});
const input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = Number(input[0]);
  const num_arr = input[1].split(' ').map(Number);
  const M = Number(input[2]);
  const qu_arr = [];
  for (let i = 0; i < M; i++) {
    qu_arr.push(input[i + 3].split(' ').map(Number));
  }

  console.log('qu_arr: ', qu_arr);
});
