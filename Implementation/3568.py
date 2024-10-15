"""
1.문제설명
기본 변수와 [] & * 제공
int& a*[]&, b, c*은
각각 int&&[]*, int&, int&*이 됨 즉 오른편은 순서를 뒤집어 왼편에 붙일 수 잇음
너무 복잡하니 한줄에 하나씩 출력예정
"""

import sys 
input = sys.stdin.readline

str = input().strip().split(' ')
main = str[0]
sub = []
for i in range(1, len(str)):
  out = str[i][:-1]
  # print(out)
  ct = 0
  for k in range(len(out)):
    if out[k] in ['&', '*', '[']:
      ct = k
      break
  new = out[ct:]
  reverse_arr = []
  # print(new)
  for j in range(0, len(new)):
    if new[j] == '&':
      reverse_arr.append('&')
    elif new[j] == '*':
      reverse_arr.append('*')
    elif new[j] == ']':
      reverse_arr.append('[]')


  reverse_arr.reverse()
  if ct == 0:
    str_var = out+';'
  else:
    str_var = out[:ct]+';'
  # print(new)
  sub.append([main+''.join(reverse_arr), str_var])

for item in sub:
  print(item[0], item[1])