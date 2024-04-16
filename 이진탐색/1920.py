"""
1.아이디어
- M개를 확인해야하는데, 연속하다는 특징 활용 가능? → 불가
- 정렬해서 이진탐색 가능??
- N개의 수 먼저 정렬
- M개의 수 하나씩 이진탐색으로 확인

2.시간복잡도
- N개의 수를 정렬하니 O(NlogN) 이건 고정
- N개를 이진탐색을 확인하므로 O(logN)이고,
- M번 해야하므로 O(MlogN)이다.
- O((N+M)logN) →200,000log100,000은 200,000 * 20 = 4,000,000이라 2억 안 넘어서 가능

3.자료구조
- N개의 수를 담을 int[]
- M개의 수를 담을 int[]

"""

import sys
input = sys.stdin.readline

N = int(input())
fix_list = list(map(int, input().split()))
M = int(input())
q_list = list(map(int, input().split()))

def search(st, en, target):
  if st == en:
    if fix_list[st] == target:
      print(1)
    else:
      print(0)
    return
  
  mid = (st + en) // 2
  if fix_list[mid] < target:
    search(mid+1, en, target)
  else:
    search(st, mid, target)

fix_list.sort()

for item in q_list:
  search(0, N-1, item)
