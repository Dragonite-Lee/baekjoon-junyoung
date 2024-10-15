import sys
input = sys.stdin.readline

N = int(input())
map = [list(map(int, input().split())) for _ in range(N)]
# print(map)
dp = [[[0 for _ in range(N)] for _ in range(N)] for _ in range(3)]

dp[0][0][1] = 1 # 기본값
# 맨 윗줄 가로줄은 다 가로가 1이니까 처리
for i in range(2,N):
  if map[0][i] == 0:
    dp[0][0][i] = dp[0][0][i-1]

# 이제 각각 점화식을 이용해 마지막까지 돌리기
for i in range(1, N):
  for j in range(1, N):
    # 가로세로 먼저 넣기
    if map[i][j] == 0:
      dp[0][i][j] = dp[0][i][j-1] + dp[2][i][j-1]
      dp[1][i][j] = dp[1][i-1][j] + dp[2][i-1][j]
    # 대각선 넣기
    if map[i][j] == 0 and map[i-1][j] == 0 and map[i][j-1] == 0:
      dp[2][i][j] = dp[0][i-1][j-1] + dp[1][i-1][j-1] + dp[2][i-1][j-1]
# print(dp)
sum = dp[0][N-1][N-1] + dp[1][N-1][N-1] + dp[2][N-1][N-1]
print(sum)