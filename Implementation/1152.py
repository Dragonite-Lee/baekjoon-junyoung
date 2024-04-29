"""
공백으로 문장의 문자열 갯수 찾기
1.아이디어
- 문장을 돌면서 공백 또는 \n을 만나게 되면 cnt증가 
2.시간복잡도
- for문 하나로 해결 O(N)
- 1,000,000을 넘지 않으므로 O(1,000,000) 2억안넘음
3.자료구조
- 문장을 받을 str
- 문자열의 갯수를 체크할 int
- 만약 공백으로 시작할 경우 체크할 boolean
"""

import sys
input = sys.stdin.readline

str = input().strip()
cnt = 0
checked = False

for item in str:
    if item != ' ':
        checked = True
    if checked:
        if item == ' ':
            cnt += 1
            checked = False
    # print(item, cnt)
#마지막 문자열 갯수 증가
if checked == True:
    cnt += 1
print(cnt)