"""
1. 문제설명
- 숫자 카드는 정수가 하나 적혀져있는 카드이다. N개 가지고 있음 
- 정수 M개가 주어졌을 때, 상근이가 이걸 몇개가지고 있는지 구하기
- 첫째줄엔 가지고 있는 숫자카드
- 둘째줄엔 몇개가지고있는지 구해야할 숫자
2. 아이디어
- bisect를 이용해서 찾기
3. 시간복잡도
- 500,000 * 2log500,000 이므로 1,000,000 * 19정도?
"""
import sys
import bisect
input = sys.stdin.readline
N = int(input())
have = list(map(int, input().split()))

M = int(input())
target = list(map(int, input().split()))

result = []
have.sort()

for num in target:
  left = bisect.bisect_left(have, num)
  right = bisect.bisect_right(have, num)
  if left == -1 and right == -1:
    result.append(0)
  else:
    result.append(right-left)

print(*result)