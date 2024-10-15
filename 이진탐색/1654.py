"""
1. 문제설명
- N개의 랜선이 있음. 자체적으로 K개가 있는데, 길이가 제각각임 즉, K개의 랜선을 짤라서 만들어야 함
- 길이가 다른 K개의 랜선에서 길이가 같은 N개의 랜선 만들기
2. 아이디어
- 
3. 시간복잡도
"""
import sys
import math
input = sys.stdin.readline

K, N = map(int, input().split())
have_arr = []
for _ in range(K):
  a = int(input())
  have_arr.append(a)

def search(st, en, target):
  # print(st, en)
  if st == en:
    cnt = 0
    for item in have_arr:
      cnt += (item // st)
    if cnt == target:
      print(st)
    else:
      print(st-1)
    return
  
  mid = (st + en) // 2
  cnt = 0
  for item in have_arr:
    cnt += (item // mid)
  # print(cnt)
  if target > cnt:
    search(st, mid, target)
  else:
    search(mid+1, en, target)
av = int(sum(have_arr) / K)
# print(av)
search(0, av, N)