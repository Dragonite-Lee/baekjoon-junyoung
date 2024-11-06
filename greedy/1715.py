"""
1. 문제설명
- 카드묶음의 수가 주어지는데 합치는 최소횟수 구하기
- 두 카드묶음을 합치는데 필요한 횟수는 양 카드의 갯수를 더하는 것
2. 아이디어
- 최소힙을 이용
- 작은 수를 만들고 더한값을 힙에 넣고 세기
3. 시간복잡도
- for문 한번

"""
import sys
import heapq
input = sys.stdin.readline

N = int(input())
hp = []
for _ in range(N):
  a = int(input())
  heapq.heappush(hp, a)

result = 0
while len(hp) != 1:
  hp_out1 = heapq.heappop(hp)
  hp_out2 = heapq.heappop(hp)

  new = hp_out1 + hp_out2
  result += new
  # print(result)
  # print('추가하기 전', hp)
  heapq.heappush(hp, new)
  # print('추가한 후', hp)

print(result)