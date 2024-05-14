"""
1.아이디어
- 8*8이므로 j,i로 2차원 배열을 꾸려서 킹이 한 칸씩 이동하며 검사
- 킹이 돌을 만나면 돌이 갈 수 있는 범위에서 움직여야함 만약 아웃이면 그 움직임은 제거
2.시간복잡도
- 이중for문 내에서 움직이며, 총 50가지 움직임이 나오므로 O(N^2)
3.자료구조
- 

R : 한 칸 오른쪽으로
L : 한 칸 왼쪽으로
B : 한 칸 아래로
T : 한 칸 위로
RT : 오른쪽 위 대각선으로
LT : 왼쪽 위 대각선으로
RB : 오른쪽 아래 대각선으로
LB : 왼쪽 아래 대각선으로
"""

import sys
input = sys.stdin.readline

K, R, N = input().split()
move = [input().strip() for _ in range(int(N))]
# 왕과 돌 좌표를 정수로 변환 [가로, 세로]
king_lo = list(K)
rock_lo = list(R)

king_num = ord(king_lo[0])-64
king_lo[0] = int(str(king_num))
king_lo[1] =int(king_lo[1])

rock_num = ord(rock_lo[0])-64
rock_lo[0] = int(str(rock_num))
rock_lo[1] =int(rock_lo[1])
# print(rock_lo)
for mo in move:
    if mo == 'R':
        if king_lo[0] + 1 < 9:
            king_lo[0] += 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] + 1 < 9:
                    rock_lo[0] += 1
                else:
                    king_lo[0] -= 1
    elif mo == 'L':
        if king_lo[0] - 1 > 0:
            king_lo[0] -= 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] - 1 > 0:
                    rock_lo[0] -= 1
                else:
                    king_lo[0] += 1
    elif mo == 'T':
        if king_lo[1] + 1 < 9: 
            king_lo[1] += 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[1] + 1 < 9:
                    rock_lo[1] += 1
                else:
                    king_lo[1] -= 1
    elif mo == 'B':
        if king_lo[1] - 1 > 0:
            king_lo[1] -= 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[1] - 1 > 0:
                    rock_lo[1] -= 1
                else:
                    king_lo[1] += 1
    elif mo == 'RT':
        if king_lo[0] + 1 < 9 and king_lo[1] + 1 < 9:
            king_lo[0] += 1
            king_lo[1] += 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] + 1 < 9 and rock_lo[1] + 1 < 9:
                    rock_lo[0] += 1       
                    rock_lo[1] += 1 
                else:
                    king_lo[0] -= 1
                    king_lo[1] -= 1
    elif mo == 'LT':
        if king_lo[0] - 1 > 0 and king_lo[1] + 1 < 9:
            king_lo[0] -= 1
            king_lo[1] += 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] - 1 > 0 and rock_lo[1] + 1 < 9:
                    rock_lo[0] -= 1
                    rock_lo[1] += 1
                else:
                    king_lo[0] += 1
                    king_lo[1] -= 1
    elif mo == 'RB':
        if king_lo[0] + 1 < 9 and king_lo[1] - 1 > 0:
            king_lo[0] += 1
            king_lo[1] -= 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] + 1 < 9  and rock_lo[1] - 1 > 0:
                    rock_lo[0] += 1
                    rock_lo[1] -= 1
                else:
                    king_lo[0] -= 1
                    king_lo[1] += 1
    elif mo == 'LB':
        if king_lo[0] - 1 > 0 and king_lo[1] - 1 > 0:
            king_lo[0] -= 1
            king_lo[1] -= 1
            if king_lo[0] == rock_lo[0] and king_lo[1] == rock_lo[1]:
                if rock_lo[0] - 1 > 0 and rock_lo[1] - 1 > 0:
                    rock_lo[0] -= 1
                    rock_lo[1] -= 1
                else:
                    king_lo[0] += 1
                    king_lo[1] += 1
    print(king_lo,rock_lo)
king_result = chr(king_lo[0]+64)+str(king_lo[1])
rock_result = chr(rock_lo[0]+64)+str(rock_lo[1])
print(king_result)
print(rock_result)