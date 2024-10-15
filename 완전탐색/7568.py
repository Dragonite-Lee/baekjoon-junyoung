"""
1. 문제설명
- 덩치를 키와 몸무게로 표현 키ycm 몸무게xkg이면 (x,y)
- x > p y > q 이면 (x,y)가 (p,q)보다 덩치가 크다
- 순서대로 나열 순위는 자기보다 큰사람 수
2. 아이디어
- 이중포문 돌기
3. 시간복잡도
- o(N^2)
"""
import sys
input = sys.stdin.readline
N = int(input());
dunk = []
for _ in range(N):
  a, b = map(int, input().split())
  dunk.append([a,b])
rank_arr = []
for i in range(N):
  rank = 1
  for j in range(N):
    if dunk[i][0] < dunk[j][0] and dunk[i][1] < dunk[j][1]:
      rank += 1
  rank_arr.append(rank)

print(*rank_arr)