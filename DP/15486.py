"""
1. 문제설명
- 오눌부터 N+1일째 되는 날 퇴사하기 위해 N일간 많은 상담하려함
- 하루에 서로 다른 사람의 상담 잡음
- 각 상담 시간 Tj 금액 Pj로 이루어짐
- 최대 이익을 내게 해라!!
2. 아이디어
- N은 1,500,000 아래임 t는 50 p는 1000아래
- N만큼 for문 돌면서 각각의 날에 최대 수익을 매김
3. 시간 복잡도
- O(N)
"""

import sys
input = sys.stdin.readline

N = int(input())
arr = []


# print(arr)
dp = [0 for _ in range(N+1)]


for i in range(1,N+1):
  T, P = map(int, input().split())
  dp[i] = max(dp[i-1], dp[i])
  if i + T <= N+1:
    dp[i+T-1] = max(dp[i-1] + P, dp[i+T-1])
print(dp)