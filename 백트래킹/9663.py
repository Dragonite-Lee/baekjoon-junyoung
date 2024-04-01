"""
1. 아이디어
- 체스판 전체를 1차원 배열로 둔다. board[2] = 1은 3번째 가로줄에 2번째 칸에 놓는 다는 의미
- 백트래킹을 이용해 반복하며, 조건에 맞으면 재귀함수를 탄다.
- 재귀함수에서 N개를 선택할 경우 print

2. 시간복잡도
- 중복불가능이므로 N! N이 15인데 가능??

3. 자료구조
- 결과값 저장 int[]
- 체스판 1차원배열 int[]

4. 특이사항
- pypy3으로만 통과됨
- 그만큼 연산줄이기 힘듬
"""

import sys
input = sys.stdin.readline

N = int(input())

result = 0
board = [0] * N

def chk(x):
  for i in range(x):
      # 세로로 같은줄 조건과 대각선 조건
      if board[x] == board[i] or abs(board[x] - board[i]) == abs(x - i):
          return False
  return True

def recur(num):
  global result
  if num == N:
      result += 1
      return
  else:
      for i in range(N):
          board[num] = i
          if chk(num):
              recur(num+1)
                    
recur(0)
print(result)