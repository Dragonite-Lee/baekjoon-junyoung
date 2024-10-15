"""
1. 문제설명
- 괄호문자열이란 잘 열리고 잘 닫혀야함 vps(괄호문자열)인지 판단해 yes no 출력
2. 아이디어
- stack 에 들어가면 무조건 빼야함 )가 먼저 나올 순 없음
3. 시간복잡도

"""
import sys
input = sys.stdin.readline
T = int(input())
for _ in range(T):
  stack = []
  bool = False
  arr = list(input().strip())
  for item in arr:
    if item == '(':
      stack.append('(')
    else:
      if stack:
        stack.pop()
      else:
        bool = True
        break
  if stack:
    bool = True
  if bool == True:
    print('NO')
  else: 
    print('YES')