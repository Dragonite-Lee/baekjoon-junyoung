"""
1. 문제설명
- N개의 수가 주어졌을 때 오름차순 정렬하기
2. 아이디어

3. 시간복잡도

"""
import sys
input = sys.stdin.readline

N = int(input())
arr = []
for _ in range(N):
  arr.append(int(input()))


def merge_sort(lt, rt):
  global arr
  if lt < rt:
    mid = (lt + rt) // 2
    # 나누기
    merge_sort(lt, mid)
    merge_sort(mid+1, rt)
    
    # 정복 및 합치기
    temp = list()
    ls = lt
    rs = mid + 1
    while ls <= mid and rs <= rt:
      if arr[ls] < arr[rs]:
        temp.append(arr[ls])
        ls += 1
      else:
        temp.append(arr[rs])
        rs += 1
    if ls <= mid:
      temp += arr[ls:mid+1]
    else:
      temp += arr[rs:rt+1]

    for i in range(lt, rt+1):
      arr[i] = temp[i-lt]

merge_sort(0,N-1)
for i in arr:
  print(i)
  