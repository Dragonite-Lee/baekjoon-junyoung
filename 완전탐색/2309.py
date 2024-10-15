"""
1. 문제설명
- 9명중 7명 찾기 7명의 키 합은 100
- 키는 모두 다르며, 오름차순 출력
2. 아이디어
- 완전탐색으로 아닌애들 검거
3. 시간복잡도
- o(n^2)
"""
import sys
input = sys.stdin.readline

height_arr = []
for _ in range(9):
  a = int(input())
  height_arr.append(a)

nine_height_total = sum(height_arr)
remove_arr = []
find = False
for i in range(9):
  for j in range(i+1,9):
    if height_arr[i] + height_arr[j] == nine_height_total-100:
      remove_arr.append(height_arr[i])
      remove_arr.append(height_arr[j])
      find = True
      break
  if find:
    break
height_arr.sort()
for i in height_arr:
  if i not in remove_arr:
    print(i)