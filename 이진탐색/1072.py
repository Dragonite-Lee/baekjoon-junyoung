"""
1. 아이디어
- 퍼센트가 1이라도 올라야 함
- 안오르는 경우 -> 숫자가 같을 때??
- 기본 반복문은 시간초과 뜸 이진탐색을 사용해야해!!!!
- 이진탐색은 전체의 경우를 반씩 줄여가며 탐색
2. 시간복잡도
- 원래는 O(N)인데, 이진탐색을 사용하면 O(logN)으로 줄어듬
3. 자료구조
- start, end int
- res int
4. 문제설명
"""
import sys
input = sys.stdin.readline

X, Y = map(int, input().split())
Z = (100*Y) // X

start = 0
end = X
res = X
if Z >= 99:
    print(-1)
else:
    while start <= end:
        mid = (start + end) // 2
        if (100*(Y + mid)) // (X + mid) > Z:
            end = mid - 1
            res = mid
            # print('A' ,start, end, mid, res)
        else:
            start = mid + 1
            # print('B',start, end, mid, res)
    print(res)
