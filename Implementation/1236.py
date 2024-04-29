"""
1.아이디어
- 모든곳을 돌아 경비원을 검사해서 row와 col 배열을 만듬
- 00000 000 -> 10000 100 -> 11000 100 -> 11000 110 -> 11100 110 ->
- 3,5 면 첫번째 위치에 놓이면 y 0하고 x 0이 동시에 해결
- 01놓으면 y 0은 이미1이니까 x만 1로 바뀜 이제 죽없다가
- 1 1 놓는데 y 1은 없는데 x 1은 있으니까 y 만 바뀜
- 1 2 놓는데 y 1은 이제 있는데 x 2는 없네? x만 바뀜
- 가로줄에 필요한 갯수가 세로줄보다 많으면 세로는 놓을 필요 없음

2.시간복잡도
- 이중for 문 N^2 -> 2500정도
- row와 col의 갯수 만큼 for -> 최대 50
3.자료구조
- row와 col의 조건 만족 int[]
- row와 col의 반환값 int

영식이는 직사각형 모양의 성을 가지고 있다. 성의 1층은 몇 명의 경비원에 의해서 보호되고 있다. 영식이는 모든 행과 모든 열에 한 명 이상의 경비원이 있으면 좋겠다고 생각했다.
성의 크기와 경비원이 어디있는지 주어졌을 때, 몇 명의 경비원을 최소로 추가해야 영식이를 만족시키는지 구하는 프로그램을 작성하시오.
첫째 줄에 성의 세로 크기 N과 가로 크기 M이 주어진다. N과 M은 50보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에는 성의 상태가 주어진다. 
성의 상태는 .은 빈칸, X는 경비원이 있는 칸이다.
"""

import sys
input = sys.stdin.readline

N, M = map(int, input().split())
map = [list(input().strip()) for _ in range(N)]
row = [0] * M
col = [0] * N
row_cnt = 0
col_cnt = 0

for y in range(N):
    for x in range(M):
        if map[y][x] == 'X':
            if col[y] != 1:
                col[y] = 1
            if row[x] != 1:
                row[x] = 1
for i in row:
    if i != 1:
        row_cnt += 1

for i in col:
    if i != 1:
        col_cnt += 1

if col_cnt > row_cnt:
    print(col_cnt)
else:
    print(col_cnt + (row_cnt - col_cnt))
# print(row, col)