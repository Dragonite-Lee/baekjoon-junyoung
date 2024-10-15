"""
1. 문제설명
- 노트에 n명의 이름을 넣으려하는데 조건 만족시켜야 함
- 이미 정해진 순서대로 넣어야함 위에서 아래로 왼쪽에서 오른쪽으로
- 만약 한사람의 이름이 한줄에 안들어갈경우 다음줄에 써야함
- 마지막 줄 빼고 각 줄의 끝에 사용하지 않고 남게 되는 칸의 수의 제곱의 합이 최소가 되게 하기
2. 아이디어
- n은 1000까지 m은 1000까지 
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
name_arr = []
for _ in range(n):
  a = int(input())
  name_arr.append(a)

dp = [[-1] * (m+1) for _ in range(n)]

dp[0][name_arr[0]] = 0

for i in range(1, n):
  for j in range(1, m+1):
    if dp[i-1][j] != -1: # 이름이 있다면 1을 띄고 더한값이 max가 안되어야함
      next = j + 1 + name_arr[i]
      if next <= m: # 안넘어가는경우
        dp[i][next] = dp[i-1][j]
      gap = m - j
      if dp[i][name_arr[i]] != -1: # 넘어가는경우
        dp[i][name_arr[i]] = min(dp[i][name_arr[i]], dp[i-1][j] + (gap*gap))
      else:
        dp[i][name_arr[i]] = dp[i-1][j] + (gap*gap)

print(min(filter(lambda x: x != -1, dp[n-1])))