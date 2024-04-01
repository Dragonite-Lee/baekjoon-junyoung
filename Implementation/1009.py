"""
1. 아이디어
- 총 컴퓨터의 갯수가 정해짐 따라서 나머지를 구해서 반환
- 제곱을 시키면 큰 수는 시간 초과 -> 10으로 나누는게 정해졌으니 규칙찾기

2. 시간복잡도
- for문 돌림 O(1)

3. 자료구조
- input값 저장 value_list : int[]
"""

import sys
input = sys.stdin.readline

T = int(input())

value_list = []
for _ in range(T):
    a, b = map(int, input().split())
    value_list.append([a, b])

for x, y in value_list:
    if x % 10 in [1, 5, 6]:
        print(x % 10)
    elif x % 10 in [4, 9]:
        if y % 2 == 0:
            print(x ** 2 % 10)
        else:
            print(x % 10)
    elif x % 10 in [2, 3, 7, 8]:
        if y % 4 == 0:
            print(x ** 4 % 10)
        else:
            print(x ** (y % 4) % 10)
    elif x % 10 == 0:
        print(10)
