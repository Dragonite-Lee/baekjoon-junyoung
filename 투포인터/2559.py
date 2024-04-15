"""
1.아이디어
- 처음에 K개의 값을 구함
- for문 : 다음 인덱스의 값을 더하고, 앞의 값을 뺌
- 이때 최대값 갱신

2.시간복잡도
- O(N) -> 100,000이라 가능

3.자료구조
-온도를 받을 리스트 int[]
-k개의 값을 더한 값 int
-결과를 저장할 값 result int 
"""

import sys
input = sys.stdin.readline

N, K = map(int, input().split())
temp_list = list(map(int, input().split()))
k_sum = 0
result = 0

for i in range(K):
  k_sum += temp_list[i]

result = k_sum

for i in range(N-K):
  k_sum -= temp_list[i]
  k_sum += temp_list[i+K]
  if k_sum > result:
    result = k_sum
  # result = max(result, k_sum)

print(result)