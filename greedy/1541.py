"""
1. 문제설명
- 식이 주어질 때 적절히 괄호를 이용해 식을 최소로 만들어라
2. 아이디어
- 문자열을 돌면서 -를 만나면 괄호로 묶기 다시 빼기를 만날때까지
- 마지막문자는 마지막에 한번더 처리
3. 시간복잡도
- O(N)이며 50줄이라 충분
"""
import sys
input = sys.stdin.readline

str_arr = list(input())
# print(str_arr)
result = 0
word = ''
semi = 0
group = False
for i in str_arr:
  if i == '+':
    if group:
      semi += int(word)
      word = ''
    else:
      result += int(word)
      word = ''
  elif i == '-':
    if group:
      semi += int(word)
      result -= semi
      word = ''
      semi = 0
    else:
      group = True
      result += int(word)
      word = ''
  else:
    word += i
  # print(result)
  # print(word)
  # print(semi)
  # print('======')
semi += int(word)
if group:
  result -= int(semi)
else:
  result += int(semi)
print(result)