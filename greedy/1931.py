"""
1. 문제설명
- 회의실 한개가 존재
- N개의 회의에 대하여 회의실 사용표를 만드려함 각 회의에 대해 시작시간과 끝나는시간이 주어짐
- 겹치지 않게 회의하는 최대 개수 
- 끝나는 동시에 시작할 수 있으며, 시작과 끝나는 시간이 같으면 바로 끝나는 것
2. 아이디어
- 끝나는 시점 기준 정렬
- 끝나는 시간이 젤 작은거부터 넣어서 그사이 값을 배열에 넣고, 회의 갯수 추가
- 매번 배열에 속하지않는데 끝나는시간이 작은거를 넣고 회의 갯수 추가
3. 시간복잡도
- N은 100,000 for문 사용
- NlogN + N = O(N(logN + 1)) -> 18,000,000정도
"""
import sys
input = sys.stdin.readline

N = int(input())
time = [list(map(int, input().split())) for _ in range(N)]

time.sort(key = lambda x: (x[1], x[0]))
# print(time)
last_end = 0
result = 0
for start, end in time:
  if start >= last_end:
    last_end = end
    result += 1

print(result)