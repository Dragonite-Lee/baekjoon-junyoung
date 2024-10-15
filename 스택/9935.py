"""
1. 문제설명
- 문자열과 폭발 문자열이 주어지면 폭발 빼고 남은 문자열 구하기 없으면 "FRULA"출력
2. 아이디어

3. 시간복잡도
- 첫문자열은 1,000,000 폭발 문자열은 36 O(N*M) 총, 36,000,000 
"""
import sys
input = sys.stdin.readline

str_arr = list(input().strip())
bomb_arr = list(input().strip())
bomb_arr_len = len(bomb_arr)
stack = []

for i in str_arr:
  stack.append(i)
  if stack[len(stack)-bomb_arr_len:len(stack)] == bomb_arr:
    for _ in range(bomb_arr_len):
      stack.pop()
# print(stack)
if stack:
  print("".join(stack))
else:
  print("FRULA")