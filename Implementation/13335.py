"""
1. 문제설명
- 다리를 n개의 트럭이 건너려고 함
- 다리 길이는 w이며, 각 트럭들은 하나의 단위시간에 하나의 단위길이만 이동함
- 트럭의 무게 합은 최대하중인 L보다 작거나 같아야 함
2. 아이디어
- 스택 이용하기
3. 시간복잡도

"""
import sys
from collections import deque
input = sys.stdin.readline

n, w, L = map(int, input().split())
truck = list(map(int, input().split()))

arrive = []
result = 0
index = 0
qu = deque()

while len(arrive) != n:
  total_weight = 0
  
  if qu and qu[0][1] == w:
    we, ti = qu.popleft()
    arrive.append((we, ti))

  if qu:
    for i in range(len(qu)):
      total_weight += qu[i][0]
      qu[i] = (qu[i][0], qu[i][1] + 1)

        

  if index < n:
    if total_weight + truck[index] <= L:
      qu.append((truck[index], 1))
      index += 1
  result += 1

print(result)