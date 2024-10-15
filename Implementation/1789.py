import sys
input = sys.stdin.readline

S = int(input())

cnt = 0
index = 1

while True:
  S -= index
  cnt += 1 
  if S <= index:
    break
  index += 1

print(cnt)