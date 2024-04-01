"""
1. 아이디어
- 받은 문자열이 다 같은 부분은 그대로 출력, 다른 부분은 ?로 출력 .이면 . 출력 
- 받아온 문자열읠 젤 첫번째를 기준으로 나머지랑 비교 다르면 ? 같으면 해당 문자 or .

2. 시간복잡도
- for문 한번 돌려서 O(1)

3. 자료구조
- 문자열을 저장할 str[]
- 문자열을 이어붙일 str
"""
# 3
# config.sys
# config.inf
# configures
import sys 
input = sys.stdin.readline

N = int(input())

value_list = []
str = ''
firstStr = ''
for _ in range(N):
    b = input()
    value_list.append(b)

for i in range(len(value_list[0])):
    for j in value_list:
        if 
        if j[i]