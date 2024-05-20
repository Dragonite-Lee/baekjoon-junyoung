"""
1. 아이디어
- 반복문을 돌며, 요소마다 숫자를 셈 -> cnt에 저장
- cnt와 K가 같으면 요소를 제거하고 cnt 초기화
2. 시간복잡도
- O(KN)이라 생각 둘 다 5000 이므로 O(25,000,000) 2500만 2억안넘음
3. 자료구조
- int cnt
- int index
- int max
- int[] re
4. 문제설명
- 요세푸스 순열이라 함은 7 3이 주어지면  3 6 2 7 5 1 4  k번째 위치를 계속해서 지워나감 
"""

import sys
input = sys.stdin.readline

N, K = map(int, input().split())
map = [i for i in range(1,N+1)]

cnt = 0
index = -1
max = N
re = []

while map:
    cnt += 1
    index += 1
    if index == max:
        index = 0
    if cnt == K:
        # print('index',index,'cnt',cnt,'max',max)
        a = map[index]
        # print(a)
        map.remove(a)
        re.append(a)
        cnt = 0
        index -= 1
        max -= 1
result = '<'
for i in range(len(re)):
    result += str(re[i])
    if i == N - 1:
        result += '>'
    else:
        result += ', '
print(result)
