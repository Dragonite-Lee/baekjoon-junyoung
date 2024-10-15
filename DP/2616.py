"""
1. 문제설명
- 기관차 고장 대비 소형기관 차 비치 소형기관차 3대는 평소 보다 적은 수만 끌 수 있음
- 소형 기관차가 최대로 끌 수 있는 객차 수 정해놓음 (그보다 많게 x) (3대 서로 같음)
- 번호가 연속적으로 이어진 객차를 끌게함 
2. 아이디어

3. 시간복잡도

"""
import sys
inpyt = sys.stdin.readline
train_cnt = int(input())
arr = list(map(int, input().split()))
max_train = int(input())

prefix_sum = [0] * (train_cnt + 1)
for i in range(1, train_cnt + 1):
    prefix_sum[i] = prefix_sum[i - 1] + arr[i - 1]

dp = [[0] * (train_cnt + 1) for _ in range(4)]

# for i in range((train_cnt // max_train) * max_train):
#   for j in range(i, i +max_train):
#     dp[0][i+max_train] += arr[j]
# print(dp)
# print(dp[0])
for i in range(1, 4):
  for j in range((i) * max_train, train_cnt+1):
    dp[i][j] = max(dp[i][j-1], dp[i-1][j-max_train] + (prefix_sum[j] - prefix_sum[j - max_train]))
print(dp[-1][-1])