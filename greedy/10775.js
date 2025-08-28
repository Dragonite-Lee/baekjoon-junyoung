/**
 * 10775 그리디 공항
 * 문제설명
 * 공항에는 G개의 게이트가 있고, 1부터 G의 번호 가짐
 * P개의 비행기가 순서대로 도착할 예정인데, i번째 비행기를 1번부터 gi번째 게이트에 영구적 도킹하려고함
 * 비행기가 아무곳도 도킹할수 없으면 폐쇄됨 최대 몇대??
 * 아이디어
 * 일단 G는 100,000 이라 이중포문은 안될듯?
 * 일단표기된거에넣고 안되면 하나씩내려가면서 넣기
 */

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('./js/input.txt'),
  // input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  const G = Number(input[0]);
  const P = Number(input[1]);
  const gate = [];
  for (let i = 0; i < P; i++) {
    gate.push(Number(input[i + 2]));
  }
  let result = 0;
  let not = true;
  const dp = Array(G + 1).fill(0);
  let i = 0;
  while (i < P && not) {//P될때까지 하고 못넣을때까지 함
    let plane_index = gate[i]; // 들어갈수있는 최대 게이트번호
    // console.log('plane_index: ', plane_index);
    // console.log('dp: ', dp);
    while (plane_index > 0 && dp[plane_index] > 0) { //한번도안넣은거면 이걸로넣어버림
      let num = dp[plane_index];
      // console.log('num: ', num);
      dp[plane_index] += 1;
      plane_index -= num;
    }
    // console.log('dp: ', dp);
    if (plane_index <= 0) {
      not = false;
    } else {
      dp[plane_index] = 1;
      result += 1;
    }
    // console.log('dp: ', dp);
    i += 1
    // console.log('===========');
  }
  console.log(result);
});
