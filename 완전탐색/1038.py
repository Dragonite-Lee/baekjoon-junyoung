import sys
input = sys.stdin.readline

N = int(input())

de_arr = []
num = [9,8,7,6,5,4,3,2,1,0]

for i in range(1,1024):
  a = []
  for j in range(len(num)):
    if i & (1<<j):
      a.append(num[j])
  
  de_arr.append(int(''.join(str(num) for num in a)))

de_arr.sort()
# print(de_arr)
if N > 1022:
  print(-1)
else:
  print(de_arr[N])