import sys
input = sys.stdin.readline

now = 0
max = 0
for i in range(10):
  x, y = map(int, input().split())
  now = now + y -x
  if (now > max):
    max = now

print(max)