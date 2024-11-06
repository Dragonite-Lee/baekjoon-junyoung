"""
1. 문제설명
- 산성용액의 특성값은 1부터 1,000,000,000 알칼리는 -1 ~ -1,000,000,000
- 0에 젤 가까운 3용액 찾기
2. 아이디어
- 기준하나 for문 돌리면서 투포인터
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

N = int(input())
arr = list(map(int, input().split()))
total = 3000000000
x,y,z = 0,0,0
arr.sort()
for i in range(N-2):
  left = i + 1
  right = N - 1
  # print(i)
  while left < right:
    # print(left, right)
    three = arr[i] + arr[left] + arr[right]
    if abs(total) > abs(three):
      total = three
      x, y, z = arr[i], arr[left], arr[right]
    if three < 0: # 좀더 양수쪽으로 다가가서 합을 0에 맞게 맞춰야함
      left += 1
    elif three > 0: # 숫자를 빼서 맞춰야함
      right -= 1
    else:
      print(x,y,z)
      sys.exit()

print(x,y,z)