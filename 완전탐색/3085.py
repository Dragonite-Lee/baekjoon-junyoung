"""
1. 문제설명
- N * N 크기에 사탕 채움 색이 다른 인접한 두칸을 골라 교환함 이때, 모두 같은 색으로 이루어진 가장 긴 연속 부분 모두 먹기
- 최대 갯수 추력
- 빨강 C 파랑 P 초록 Z 노랑 Y
2. 아이디어
- N이 3 <= N <= 50
- 상하 좌우 따로 계산 옆친구랑 다르면 교환하고 개수 세고 다시 원상복귀
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

N = int(input())

graph = [list(input().strip()) for _ in range(N)]
# print(graph)
def count_candy(arr):
  MAX = 0
  for i in range(N):
    count = 0
    now = arr[i][0]
    for j in range(N):
      if now == arr[i][j]:
        count += 1
      else:
        now = arr[i][j]
        MAX = max(MAX, count)
        count = 1
    if j == N - 1: MAX = max(count, MAX)

  for i in range(N):
    count = 0
    now = arr[0][i]
    for j in range(N):
      if now == arr[j][i]:
        count += 1
      else:
        now = arr[j][i]
        MAX = max(MAX, count)
        count = 1
    if j == N - 1: MAX = max(count, MAX)
  return MAX

result = count_candy(graph)
for i in range(N):
  for j in range(N-1):
    if graph[i][j] != graph[i][j+1]:
      graph[i][j], graph[i][j+1] = graph[i][j+1], graph[i][j]
      result = max(result, count_candy(graph))
      graph[i][j], graph[i][j+1] = graph[i][j+1], graph[i][j]

for j in range(N):
  for i in range(N-1):
    if graph[i][j] != graph[i+1][j]:
      graph[i][j], graph[i+1][j] = graph[i+1][j], graph[i][j]
      result = max(result, count_candy(graph))
      graph[i][j], graph[i+1][j] = graph[i+1][j], graph[i][j]

print(result)