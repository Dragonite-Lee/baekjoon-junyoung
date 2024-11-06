"""
1. 문제설명
- 벨트의 임의의 한 위치부터 k개의 접시를 연속해서 먹으면 할인된 정액 가격 제공
- 초밥 종류 쿠폰 발행해 1번에 참가할 경우 하나를 추가 무료 제공 벨트에 없으면 만들어 제공
- 다양한 종류의 가짓수를 먹자!
2. 아이디어

3. 시간복잡도
"""
import sys
from collections import deque
input = sys.stdin.readline
N, d, k, c = map(int, input().split())
# 접시수, 가짓수, 연속접시수, 쿠폰번호
sushi = []
for _ in range(N):
  sushi.append(int(input()))

def counter(arr, plus):
  change = set(arr)
  change.add(plus)
  arr_ch = list(change)
  len_arr = len(arr_ch)
  return len_arr

eat = deque(sushi[N-k:])
cnt = counter(eat, c)
for i in range(N-1):
  eat.popleft()
  eat.append(sushi[i])
  cnt = max(cnt, counter(eat, c))

print(cnt)