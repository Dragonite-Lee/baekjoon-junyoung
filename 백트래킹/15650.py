"""
1. 아이디어
- 백트래킹 재귀함수 안에서, for 돌면서 숫자 선택 (이때 방문여부 확인)
- 재귀함수에서 M개를 선택할 경우 print

2. 시간복잡도
- 중복불가능이므로 N! N이 8까지 이므로 가능

3. 자료구조
- 결과값 저장 int[]
- 방문여부 체크 bool[]
"""

import sys 
input = sys.stdin.readline

N, M = map(int, input().split())
result = []
visited = [False] * (N + 1)

def recur(num):
  if num == M:
    print(' '.join(map(str, result)))
    return
  for i in range(1, N+1):
    if result:
      if visited[i] == False and result[-1] <= i: # 맨 뒷 요소보다 커야함 
        visited[i] = True
        result.append(i)
        recur(num+1)
        visited[i] = False
        result.pop()
    else:
      if visited[i] == False:
        visited[i] = True
        result.append(i)
        # print(i,"재귀전:",result,"현재 num:",num)
        recur(num+1)
        visited[i] = False
        result.pop()
      # print(i,"재귀후:",result,"현재 num:",num)
        
recur(0)