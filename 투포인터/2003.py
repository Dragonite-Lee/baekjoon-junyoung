"""
1. 아이디어
- 이중포문을 사용한다면? N이 10,000이므로 100,000,000에 len에 의해 시간 초과
- 연속적인 특징을 활용해 투포인터로 풀어야 함
- left right를 두고 left 는 0 right는 left+1부터 시작
2. 시간복잡도
- O(100,000,000) 1억이라 가능
3. 자료구조
- result int
- left, right int
- left_bool, right_bool boolean
4. 문제설명
- N, M이 주어지며 N개의 배열이 주어지면 일렬로 더해서 M이 되는 경우의 수를 구해라
4 2
1 1 1 1 앞에서부터 더함 이중포문 쓰면 100,000,000 left 빼고 right 빼다가 0이면 증가 left 증가 아니면 left만증가
"""
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
num_list = list(map(int, input().split()))

# 일반적인 이중포문 풀이
# print(num_list)
# result = 0
# len_num = len(num_list)
# for i in range(len_num):
#     sum_value = M - num_list[i]
#     if sum_value == 0:
#         result += 1
#     else:
#         for j in range(i+1, len_num):
#             sum_value -= num_list[j]
#             if sum_value == 0:
#                 result += 1
#                 break
#             elif sum_value < 0:
#                 break

result = 0
left = 0
right = 1
left_bool = False
right_bool = False

while left < N and right < N:
    if left_bool:
        sum_value -= num_list[right]
        if sum_value == 0:
            left_bool = False
            result += 1
            left += 1
            right = left + 1
        elif sum_value < 0:
            left_bool = False
            left += 1
            right = left + 1
        else:
            right += 1
    else:
        sum_value = M - num_list[left]
        left_bool = True
        if sum_value == 0:
            left_bool = False
            result += 1
            left += 1
            right += 1
        elif sum_value < 0:
            left_bool = False
            left += 1
            right += 1

# 마지막 값이 딱 M일 때
if right == N and M - num_list[left] == 0:
    result += 1
 
print(result)