import sys
input = sys.stdin.readline
x, y, z = map(int, input().split())

result = 0
for i in range(z):
  x = x % y * 10
  result = x // y
print(result)