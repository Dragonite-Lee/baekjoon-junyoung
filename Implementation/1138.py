"""
1.아이디어
- 나보다 큰 사람이 주어지면 처음부터해서 0의 값을 셈
- 센 수가 내 옆사람 수와 같으면 넣음

2.시간복잡도
- 이중 for 문 O(N^2)인데 N이 10이므로 100

3.자료구조
- 결과를 담는 int[]

4.문제 설명
내 왼쪽에 나보다 큰 사람이 몇 명 있는지 주어짐
7
6 1 1 1 2 0 0
6 2 3 4 7 5 1

10
5 3 7 1 4 2 1 0 0 0
8 4 7 2 6 1 9 5 10 3
"""

import sys
input = sys.stdin.readline

N = int(input())
info = list(map(int, input().split())) #2 1 1 0 -> 4213 0000

result = [0 for _ in range(N)] #0 0 0 0

for i in range(len(info)):
    cnt = 0 
    bt = 0
    while True:
        if result[cnt] == 0:
            if bt == info[i]:
                result[cnt] = i + 1
                break
            bt += 1
        cnt += 1

print(*result)

