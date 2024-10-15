"""
1. 아이디어
- 정렬 후 짧은애부터 자기보다 뒤에것들이랑 비교해보기
"""
import sys
input = sys.stdin.readline

N = int(input())

str_arr = []
for _ in range(N):
  str_arr.append(input().strip())

str_arr.sort()
result = 0
# print(str_arr)
for i in range(N):
  bo = False
  for j in range(i+1,N):
    if str_arr[i] == str_arr[j][:len(str_arr[i])]:
      bo = True
      break
  if bo == False:
    result += 1

print(result)