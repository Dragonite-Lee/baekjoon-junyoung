"""
1. 문제설명
- 곡 시작 전 볼륨바꾸려함 공연 시작 전 각각의 곡 전 바꿀 볼륨 리스트 만듬
-볼륨은 0 이상 M이하여야함
2. 아이디어
"""
import sys
from collections import deque
input = sys.stdin.readline

N, S, M = map(int, input().split());
song_cnt = list(map(int, input().split()))

now = set()
now.add(S)
re = False
for i in range(N):
  next = set()
  for num in now:
    if num + song_cnt[i] <= M:
      next.add(num + song_cnt[i])
    if num - song_cnt[i] >= 0:
      next.add(num - song_cnt[i])
  if not next:
    re = True
    break
  now = next

if re == True:
  print(-1)
else:
  max_value = max(now)
  print(max_value)