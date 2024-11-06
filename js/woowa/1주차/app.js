const fs = require('fs');
const input = fs.readFileSync('./js/input.txt').toString().trim();

let default_distinguish_string = [',', ':'];

if (isNaN(input[0])) {
  const START_STRING = input[0] + input[1];
  if (START_STRING !== '//') {
    throw new Error('[ERROR] 구분문자열을 시작// \\n입니다.')
  }
  let string_index = 2;

  while (input.slice(string_index, string_index + 2) !== '\\n') {
    if (!default_distinguish_string.includes(input[string_index])) {
      default_distinguish_string.push(input[string_index]);
    }
    string_index++;
  }
}
console.log(default_distinguish_string)
//디폴트 구분 문자열로 숫자 합 계산

/**
 * 첫문자가 숫자인지 /인지
 * //;\n1;2;3
 */
