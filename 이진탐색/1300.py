"""
1. 문제설명
- N * N인 배열 A
- A[i][j] = i+j임
- 이걸 일차원배열 B에 넣으면 크기는 N*N이됨 오름차순 정렬 시 B[k]구하기
2. 아이디어
- 이진탐색을 어떻게 적용할지가 메인임
- 7번째 수 라는 것은 해당 수 보다 작거나 같은게 7개 있다는 뜻
3. 시간복잡도
- log100,000 이므로 충분
"""
import sys
input = sys.stdin.readline
N = int(input())
k = int(input())

start, end = 1, k

def search(st, en):
  global k
  if st == en:
    print(st)
    return

  mid = (st + en) // 2
  cnt = 0
  for i in range(1, N+1):
    cnt += min(mid//i, N)
  
  if cnt < k:
    search(mid+1, en)
  else:
    search(start, mid)

search(1, N**2)