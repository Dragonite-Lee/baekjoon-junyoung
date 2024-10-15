import sys
input = sys.stdin.readline

N = int(input())
list = list(map(int, input().split()))
result = 0
for i in list:
  if i == 1:
    result += 1
  else:
    for j in range(2,i):
      if i % j == 0:
        result += 1
        break

print(len(list)-result)