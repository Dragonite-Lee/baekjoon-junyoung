import sys
input = sys.stdin.readline

A, B = map(int, input().split())
cnt = 0
result = 100000
oper = [2,1]
def dfs(start, end):
  
  global cnt, result
  if start > end:
    return
  elif start == end:
    result = min(result, cnt)
  else:
    for i in oper:
      if i == 2:
        cnt += 1
        # print('*2', start*i, cnt)
        dfs(start*i, end)
        cnt -= 1
      else:
        cnt += 1
        # print('+1', int(str(start) + str(i)), cnt)
        dfs(int(str(start) + str(i)), end)
        cnt -= 1

dfs(A,B)
if result == 100000:
  print(-1)
else:
  print(result+1)