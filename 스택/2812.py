"""
1. 문제설명
- N숫자가 주어짐. 숫자 K개를 지워서 얻을 수 있는 가장 큰 수
2. 아이디어
- 완탐은 안됨
- 앞에서부터 큰수를 남겨야함
- stack에 넣으며 넣으려하는 수가 마지막수보다 크면 제거하고 넣음
- while -> 스택에 존재 + K > 0 + 스택의 마지막수보다 넣으려하는수가 크면 제거하고 넣음
3. 시간복잡도
"""
import sys 
input = sys.stdin.readline
N, K = map(int, input().split())
num_arr = list(str(int(input())))

stack = []


for num in num_arr:
  while stack and K > 0 and stack[-1] < num:
    K -= 1
    stack.pop()
  stack.append(num)
 
if K > 0:
  print("".join(stack[:-K])) # 뒤에서부터 K개 짜르려함
else:
  print("".join(stack))
