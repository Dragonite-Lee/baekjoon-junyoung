"""
1. 문제설명
- R은 뒤집기 D는 첫번째요소 버리기 없으면 에러
2. 아이디어

3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline

T = int(input())
result = []
for _ in range(T):
  func = list(input().strip())
  n = int(input())
  num_list = [int(x) for x in input().strip()[1:-1].split(',') if x]
  dq = deque(num_list)
  # print(num_list)
  error = False
  reverse_type = False
  if n == 0 and 'D' in func:
    error = True
  else:
    for do in func:
      if do == 'R':
        if reverse_type:
          reverse_type = False
        else:
          reverse_type = True
      else:
        if dq:
          if reverse_type:
            dq.pop()
          else:
            dq.popleft()
        else:
          error = True
          break
  
  if error:
    result.append('error')
  else:
    a = list(dq)
    if reverse_type:
      a.reverse()
      result.append("[" + ",".join(map(str, a)) + "]")
    else:
      result.append("[" + ",".join(map(str, a)) + "]")

for i in result:
  print(i)