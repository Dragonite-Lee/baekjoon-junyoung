"""
1. 문제설명
- 10,000이하 자연수로 이루어진 길이 N짜리 수열 주어짐
- 부분합이 S이상 되는 것 중 가장 짧은 것의 길이
2. 아이디어
- 상단포문 기준 이중 포문
3. 시간복잡도
- O(N^2)인데 N이 100,000이므로 10,000,000,000 10억?? 시간 초과 투포인터 사용해야함
"""
import sys
input = sys.stdin.readline

N, S = map(int, input().split())
arr = list(map(int, input().split()))
right = 0
left = 0
sum = 0
result = 1000000

while True:
  if sum >= S:
    # left 포인터를 옮김
    result = min(result, right - left)
    sum -= arr[left]
    left += 1
  elif right == N:
    break
  else:
    # right 포인터를 S가 될때까지 옮김
    sum += arr[right]
    right += 1
  

if result == 1000000:
  print(0)
else:
  print(result)