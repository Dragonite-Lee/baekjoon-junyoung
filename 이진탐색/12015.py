"""
1. 문제설명
- 수열이 주어지면 가장 긴 증가하는 부분 수열의 길이 구하기
2. 아이디어
- 이진탐색으로 작으면 그냥 넣고 크면 위치찾아 넣기
3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N = int(input())
arr = list(map(int, input().split()))

memo = [0]

def search(st, en, target):
  global memo
  if st == en:
    memo[st] = target
    return
  mid = (st + en) // 2
  if memo[mid] >= target:
    search(st, mid, target)
  else:
    search(mid+1, en, target)


for item in arr:
  if memo[-1] < item:
    memo.append(item)
  else:
    search(0, len(memo), item)
# print(memo)
print(len(memo)-1)