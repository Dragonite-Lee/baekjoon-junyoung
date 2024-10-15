import sys
input = sys.stdin.readline

x, y = map(int, input().split())

arr = []
for i in range(1, y+1):
  for j in range(1,i+1):
    arr.append(i)

print(sum(arr[x-1:y]))