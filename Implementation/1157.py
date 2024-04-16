"""
1.아이디어
- 한 글자씩 다돌면서 검사해도 됨 1,000,000을 넘지 않으니 1억임
- 로직은?
- 대문자로 출력해야하니 일단 전체를 for문 돌려서 대문자로 변환한 뒤, Counter에 넣음

2.시간복잡도
- O(1,000,000) 2억 안넘어서 괜찮음

3.자료구조
- str을 받는 str
"""

import sys 
import collections
input = sys.stdin.readline

str = input().strip()
new_str = ''
re = []

new_str = str.upper() #upper lower생각하기
counter = collections.Counter(new_str)
re = [k for k, v in counter.items() if max(counter.values()) == v] #리스트 컴프리헨션 k로 리스트를 만들건데 반복할거임 counter의 items들을 모두. 근데 어떤? max인 v랑 같은 애들만
if len(re) != 1:
  print("?")
else:
  print(re[0])
# print(re)