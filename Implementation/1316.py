"""
1. 아이디어
- 이중for문을 돌리며 단어마다 처음보는 알파벳을 리스트에 넣을거임
- 근데 현재 최산단어, 과거단어로 구분해서 저장 새로나온 알파벳이 과거단어에 속하면 break하며 전체갯수에서 - 1

2. 시간복잡도
- N은 최대 100이고 알파벳의 길이도 100이므로 100*100은 10000
- O(10000)이 2억이 안넘으므로 ok

3. 자료구조
- 받아올 문자열을 담는 str[]
- 최신문자열 str
- 과거문자열을 담을 str[[]]
- 카운트 cnt int

그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다.
예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, 
aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.
단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.
aba
"""

import sys
input = sys.stdin.readline

N = int(input())
str_list = []
for _ in range(N):
    str = input().strip()
    str_list.append(str)

new_str = ''
old_str = [[] for _ in range(N)]
cnt = N

for i, item in enumerate(str_list):
    for j in item:
        # 초기조건
        if new_str == '':
            new_str = j
        if new_str != j:
            old_str[i].append(new_str)
            new_str = j
            if new_str in old_str[i]:
                cnt -= 1
                # print(item, cnt)
                break
    new_str = ''
print(cnt)