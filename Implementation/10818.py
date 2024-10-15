import sys
input = sys.stdin.readline

N = int(input())
list = list(map(int, input().split()))
list.sort()
print(list[0], list[N-1])
# print(N, list)
# min = list[0]
# max = list[0]

# for num in list:
#   if num > max:
#     max = num
#   if num < min:
#     min = num

# print(min, max)