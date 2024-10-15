import sys
input = sys.stdin.readline
Y, X = map(int, input().split())
arr = list(map(int, input().split()))

simul = [[0 for _ in range(X)] for _ in range(Y)]

for i in range(X):
  for j in range(arr[i]):
    simul[j][i] = 1

def count_arr(arr):
  check = False
  zero_cnt = 0
  total = 0
  for i in arr:
    if i == 1:
      check = True
      total += zero_cnt
      zero_cnt = 0
    elif (i == 0 and check == True):
      zero_cnt += 1
  return total

result = 0
for i in simul:
  result += count_arr(i)

print(result)