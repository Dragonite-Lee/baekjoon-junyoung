"""
1. 아이디어
- 큰 금액의 동전부터 차감
- 반례? : 동전의 개수가 무한대라서 없는것으로 보임
- K를 동전 금액으로 나눈 뒤 남은값으로 갱신
2. 시간 복잡도
- for: N → O(N)
3. 자료구조
- 동전 금액 int[]
- 현재 남은 금액 int
- 동전 개수 int
"""

import sys 
input = sys.stdin.readline

N, K = map(int, input().split())
coin_list = [int(input()) for _ in range(N)]
cnt = 0

# print(coin_list)
coin_list.reverse()
for coin in coin_list:
  if coin <= K:
    a = K // coin
    b = K % coin
    cnt += a
    K = b

print(cnt)