"""
1. 문제설명
- 크기가 N*M 행렬과 M*K를 곱할 때 연산의 수는 N*M*K이다
- 행렬은 곱센 순서에 따라 연산이 달라짐 N개의 크기가 주어졌을때 연산 횟수의 최솟값을 구해라
2. 아이디어
- dp란 결국 연산을 줄이기 위해 이전 값을 이용하는것임
- 행렬3개면 2개의 최소크기 4개면 3개의 최소크기를 구헤야 함
3. 시간복잡도
"""
import sys
input = sys.stdin.readline
N = int(input())
arr = []
for _ in range(N):
  r, c = map(int, input().split())
  arr.append((r, c))

dp = [[0] * N for _ in range(N)]

for end in range(1, N):
  for start in range(N):
    if end + start == N:
      break
    dp[start][start+end] = int(1e9)
    for i in range(start, start+end):
      dp[start][start+end] = min(dp[start][start+end], dp[start][i] + dp[i+1][start+end] + arr[start][0] * arr[i][1] * arr[start+end][1])
      print(dp[start][start+end], start, end)

print(dp[0][N-1])