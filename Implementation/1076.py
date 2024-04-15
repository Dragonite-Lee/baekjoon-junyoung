"""
1. 아이디어
- 제공해준 표를 배열처리 한 뒤,
- 입력받은 값을 문자열로 이어 붙인다.

- 더 좋은 방법
- 해쉬구조 이용 딕셔너리 형태로 표를 저장

2. 시간복잡도
- 색 배열을 돌고, 3개의 숫자를 반복하므로 O(30)

- 딕셔너리 구조는 O(1)의 시간 복잡도를 가지므로 효율적이다.
3. 자료구조
- 제공해준 표를 담을 int[]
- 문자열을 담을 int[]
"""

import sys
input = sys.stdin.readline

a = input().strip()
b = input().strip()
c = input().strip()

graph = {'black' : 0, 'brown' : 1, 'red' : 2, 'orange' : 3, 'yellow' : 4, 'green' : 5, 'blue' : 6, 'violet' : 7, 'grey' : 8, 'white' : 9}
# print(graph[a])
print((graph[a] * 10 + graph[b]) * (10 ** graph[c]))