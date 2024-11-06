"""
1. 문제설명
- 뮤탈1마리와 scv N마리 남아있음  각 체력이 주어짐 뮤탈은 한번에 3개의 scv공격이가능한데, 9-3-1순으로 체력을잃음
2. 아이디어

3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N = int(input())
scv = list(map(int, input().split()))
if N == 2:
  scv.extend([0])
elif N == 1:
  scv.extend([0, 0])
# print(scv)
comb = [[9, 3, 1], [9, 1, 3], [3, 9, 1], [3, 1, 9], [1, 3, 9], [1, 9, 3]]
dp = [[[60] * 61 for _ in range(61)] for _ in range(61)]
dp[scv[0]][scv[1]][scv[2]] = 0
def dfs(one, two, three):
  global dp
  if (one, two, three) == (0, 0, 0):
    return
  for x, y, z in comb:
    one_ = max(0, one - x)
    two_ = max(0, two - y)
    three_ = max(0, three - z)
    if dp[one_][two_][three_] > dp[one][two][three] + 1:
      dp[one_][two_][three_] = dp[one][two][three] + 1
      dfs(one_, two_, three_)

dfs(scv[0], scv[1], scv[2])
print(dp[0][0][0])