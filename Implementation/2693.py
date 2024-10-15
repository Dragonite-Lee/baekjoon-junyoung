import sys
input = sys.stdin.readline

N = int(input())
list_arr = []
for _ in range(N):
  list_arr.append(list(map(int, input().split())))
# print(list_arr)
for ar in list_arr:
  ar.sort(reverse=True)
  print(ar[2])