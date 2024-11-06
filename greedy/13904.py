"""
1. 문제설명
- 과제마다 마감일이 있고, 끝낼때 얻는 점수가 있음
- 최대값 출력
2. 아이디어
- 점수순위로 날짜를 두고,
- 해당일에 숙제를 놓으나 그 칸이 안비어있다면 하나씩 내림
3. 시간복잡도
"""
import sys
import heapq
input = sys.stdin.readline

N = int(input())
homework = []
max_day = 0
for _ in range(N):
  d, w = map(int, input().split())
  heapq.heappush(homework, (-w, d))
  if d > max_day:
    max_day = d

assign = [False] * (max_day+1)

result = 0
while homework:
  ow, od = heapq.heappop(homework)
  ow = -ow

  for i in range(od,0,-1):
    if assign[i]:
      continue
    
    result += ow
    assign[i] = True
    break

print(result)