"""
1.아이디어
- 넓이의 기본값은 1
- 이중for문을 이용하며 한점에서 그 값과 같은 제일 먼위치의 값 찾기
- 그 후, 아랫줄도 같은 길이로 찾아서 맞으면 넓이 구하기
2.시간복잡도
- for문 3중 O(N^3)인데 N이 50이므로 625,000라 오케이
3.자료구조
- for문 돌다 현재값 저장할 now int
- 초기 가로 길이 저장할 interval int
- 넓이 저장할 result int
"""

import sys 
input = sys.stdin.readline

N, M = map(int, input().split())
map = [list(input().strip()) for _ in range(N)]
# print(map)
now = 0
interval = 0
result = 1

for j in range(N):
    for i in range(M):
        now = map[j][i]
        for k in range(M):
            if k > i:
                if map[j][k] == now:
                    interval = k - i
                    # print(j,i,interval)
                    if j + interval <= N - 1:
                        # print(j,i,k,j+interval)
                        if map[j+interval][i] == now and map[j+interval][k] == now:
                            result = max(result, (interval+1)**2)
print(result)