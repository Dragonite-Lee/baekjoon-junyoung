"""
1. 문제설명
- 심사시간이 주어짐
- 자기 차례 기다리거나 빈곳으로 바로 가버려도 됨
- 어떻게 해야 최소시간이 나올지!
2. 아이디어

3. 시간복잡도

"""
import sys
input = sys.stdin.readline
N, M = map(int, input().split())
check_arr = []
for _ in range(N):
  a = int(input())
  check_arr.append(a)

def search(st, en):
  # print(st, en)
  if st == en:
    ok_person = 0
    for item in check_arr:
      if st >= item:
        ok_person += (st // item)
    # print(ok_person)
    if ok_person >= M:
      print(st)

    return
  
  mid = (st + en) // 2
  ok_person = 0
  for item in check_arr:
    if mid > item:
      ok_person += (mid // item)
  if ok_person >= M:
    search(st, mid)
  else:
    search(mid+1, en)

check_arr.sort()
start = check_arr[0]
end = check_arr[-1] * M
search(start, end)