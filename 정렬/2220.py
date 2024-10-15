"""
1. 문제설명

2. 아이디어

3. 시간복잡도
"""
import heapq
import sys
input = sys.stdin.readline

n = int(input())

a = []
for i in range(2,n+1):
  heapq.heappush(a, (-i, i))
  
a.append((-1,1))
for item in a:
  print(item[1], end=" ")