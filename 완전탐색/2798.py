"""
1. 문제설명
- 블랙잭 : 21 안넘는 수 중 최대한 크게 만드는 게임
- 양의 정수가 있고, N장의 카드는 보이게 바닥에 놓는다. 그리고 M을 외침
- N장의 카드 중 3장을 골라야하며, M넘지않으며 가깝게 만듬
2. 아이디어
- 100개이므로 3중포문? 
- 1,000,000 이라 충분?
- 500에 가깝다는건 500과의 차가 젤 작다!!
3. 시간복잡도
- 카드의 개수 N은 3 <= N <=100, M은 10 <= M <= 300,000
- O(N^3)
"""
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
num_arr = list(map(int, input().split()))
result = 300001
for i in range(N):
  for j in range(i+1,N):
    for k in range(j+1,N):
      three_total = num_arr[i] + num_arr[j] + num_arr[k]
      if M - three_total >= 0:
        result = min(result, M - three_total)

print(M-result)