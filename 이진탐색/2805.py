"""
1. 문제설명
- 나무 M미터가 필요함 절단기 허가받음
- 절단기에 높이 H를 지정 ->톱날이 H로 올라가서 자르게 됨
2. 아이디어
- N: 나무의 수
- M: 가져가려는 나무의 길이 
- 이진탐색? 시간복잡도는 logN
3. 시간복잡도
- N개의 수 정렬이라 NlogN
- N개를 이진탐색이라 logN
- O((N+1)logN)은 1,000,000log(1,000,000)
"""
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
tree_arr = list(map(int, input().split()))

def search(st, en, target):
  if st == en:
    cnt = 0
    for tree in tree_arr:
      if tree - st > 0:
        cnt += (tree - st)
    if cnt == target:
      print(st)
    else:
      print(st-1)
    return
  
  mid = (st + en) // 2
  cnt = 0
  for tree in tree_arr:
    if tree - mid > 0:
      cnt += (tree - mid)
  if target > cnt:
    search(st, mid, target)
  else:
    search(mid+1, en, target)
  

tree_arr.sort()
search(0, tree_arr[-1], M)