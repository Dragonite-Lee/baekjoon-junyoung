"""
1. 문제설명
- f_arr 가 a_arr안에 들어있으면 1 아니면 0
2. 아이디어
- N은 100,000 M도 100,000이라 이중포문 불가
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

N = int(input())
a_arr = list(map(int, input().split()))
M = int(input())
f_arr = list(map(int, input().split()))

def search(st, en, target):
  if st == en:
    if a_arr[st] == target:
      print(1)
    else:
      print(0)
    return
  
  mid = (st + en) // 2
  if target > a_arr[mid]:
     search(mid+1, en, target)
  else:
     search(st, mid, target)
		
a_arr.sort()

for find in f_arr:
	search(0, N-1, find)