"""
1. 문제설명
- N개가 수직선 위에 있음 각 좌표는 x1 ~ xn이 됨
- 집에 공유기 C개를 설치하려함 (한 집에는 한 개만 가능)
2. 아이디어
- 이중포문은 안됨
- 이진탐색을 하는데... 공유기 횟수만큼만..?
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

N, C = map(int, input().split())
home_arr = []
for _ in range(N):
  a = int(input())
  home_arr.append(a)


def search(st, en):
  # print(st, en)
  if st == en:
    now = home_arr[0]
    cnt = 1
    for item in home_arr:
      if item - now >= st:
        cnt += 1
        now = item
    if cnt == C:
      print(st)
    else:
      print(st-1)
    return
  
  mid = (st + en) // 2
  now = home_arr[0]
  cnt = 1
  for item in home_arr:
    if item - now >= mid:
      cnt += 1
      now = item
  
  if cnt >= C:
    search(mid+1, en)
  else:
    search(st, mid)


home_arr.sort()
start = 1
end = home_arr[-1] - home_arr[0]
if C == 2:
  print(end)
else:
  search(start, end)