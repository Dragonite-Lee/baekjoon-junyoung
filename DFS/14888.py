import sys
input = sys.stdin.readline

N = int(input())
array = list(map(int, input().split()))
tools = list(map(int, input().split()))

calculate = [
  lambda a, b: a + b,  # 덧셈
  lambda a, b: a - b,  # 뺄셈
  lambda a, b: a * b,  # 곱셈
  lambda a, b: a // b if a >= 0 else -(-a//b) 
]

max_value = -1000000000
min_value = 1000000000
def recur(num = 0, result = array[0]):
  global max_value, min_value
  if num == N - 1:
    max_value = max(max_value, result)
    min_value = min(min_value, result)
  else:
    for i in range(4):
      if tools[i] == 0:
        continue
      tools[i] -= 1
      recur(num + 1, calculate[i](result, array[num+1]))
      tools[i] += 1

recur()
print(max_value)
print(min_value)