"""
1. 문제설명
- LCS는 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.
2. 아이디어
- 가장 먼저 든 생각
- 짧은친구부터 반복문돌면서 있는지 확인 있으면 index기록해서 그 index부터 돌기
"""
import sys
input = sys.stdin.readline

str1 = list(input().strip())
str2 = list(input().strip())
# print(str1, str2)
len1 = len(str1)
len2 = len(str2)
lcs = [[0] * (len2+1) for _ in range(len1+1)]
for i in range(len1+1):
  for j in range(len2+1):
    if i == 0 or j == 0:
      lcs[i][j] = 0
    elif str1[i-1] == str2[j-1]:
      lcs[i][j] = lcs[i-1][j-1] + 1
    else:
      lcs[i][j] = max(lcs[i-1][j], lcs[i][j-1])

print(lcs[-1][-1])