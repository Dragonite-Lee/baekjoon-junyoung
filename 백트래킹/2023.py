"""
1. 아이디어
- dfs -> 재귀이용
- 2,3,5,7부터 탐색
- 자릿수 늘어나면 처음수 * 10 + a 를 하면서 소수면 자릿수 늘림
- 자릿수가 N이면 해당값 출력
"""
import sys
input = sys.stdin.readline

N = int(input())

def is_prime(num):
  for i in range(2, int(num / 2 + 1)):
    if num % i == 0:
      return False
  return True

def recur(num):
  if len(str(num)) == N:
    print(num)
  else:
    for i in range(1,10):
      if i == 2:
        continue
      if is_prime(num*10 + i):
        recur(num*10+i)

recur(2)
recur(3)
recur(5)
recur(7)