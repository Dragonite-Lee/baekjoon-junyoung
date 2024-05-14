"""
뒤에서부터 읽어도 같은걸 팰린드롬이라함 yes or no출력
1.아이디어
- 받은 숫자를 인덱스 슬라이싱을 이용해서 뒤집어서 같으면 yes 다르면 No
2.시간복잡도
- whilq문 돌림 O(N)
3.자료구조
- num int
"""

import sys
input = sys.stdin.readline

while True:
    num = input()
    if int(num) == 0:
        break
    if int(num) == int(num[::-1]):
        print("yes")
    else:
        print("no")