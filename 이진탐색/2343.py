"""
1. 문제설명
- 기타 강의 동영상을 블루레이로 만들려함 N개의 강의가 들어가는데 순서가 바뀌면 안됨
- 즉 i번 강의와 j번 강의를 같은 블루레이에 녹화하려면 i와 j 사이의 모든 강의도 블루레이에 녹화해야함 -> 중간에 끊었다할수없음
- 블루레이를 가급적 줄일려고 함 M개의 블루레이에 모든걸 녹화하려고하는데 크기를 최소로하고 모두 같은크기여야함
2. 아이디어
- 이진탐색은 범위를 잡는게 중요함 보통 구해야하는 것의 최대최소가 범위가 됨
- 블루레이의 최소크기와 최대크기를 범위로잡고 시작
- 각 탐색마다 time배열을 돌아 mid값보다 커지게 되면 갯수셈
3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
time = list(map(int, input().split()))

start = max(time)
end = sum(time)
# print(start, end)
def search(st, en, target):
  global time
  if st == en:
    print(st)
    return
  
  mid = (st + en) // 2
  total = 0
  cnt = 0
  # print('mid', mid)
  for i in time:
    if total + i > mid:
      cnt += 1
      total = 0
    total += i
  cnt += 1
  # print(cnt)
  if target >= cnt:
    search(st, mid, target)
  else:
    search(mid+1, en, target)

search(start, end, M)