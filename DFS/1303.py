"""
1. 아이디어
- bfs로 시작부터 영역세며 글로벌 변수에 제곱해서 값 넣기
2. 시간복잡도
- 노드와 간선의 합이니 10000개의 노드와 40000개의 간선이라 통과
3. 자료구조
- b_cnt int
- w_cnt int
4. 문제설명
5 5
WBWWW
WWWWW
BBBBB
BBBWW
WWWWW
"""
import sys
input = sys.stdin.readline

N, M = map(int, input().split())
graph = [list(input().strip()) for _ in range(M)]
visited = [[False] * N for _ in range(M)]

b_cnt = 0
w_cnt = 0
dx = [1, 0, -1, 0]
dy = [0, 1, 0, -1]
def BFS(y, x, state):
    size = 1
    q = [(y,x)]
    while q:    
        ny, nx = q.pop()
        for i in range(4):
            ex = nx + dx[i]
            ey = ny + dy[i]
            if 0 <= ex < N and 0 <= ey < M:
                if visited[ey][ex] == False and graph[ey][ex] == state:
                    q.append((ey,ex))
                    visited[ey][ex] = True
                    size += 1
    return size**2

for i in range(M):
    for j in range(N):
        if visited[i][j] == False and graph[i][j] == "B":
            visited[i][j] = True
            b_cnt += BFS(i, j, "B")
        elif visited[i][j] == False and graph[i][j] == "W":
            visited[i][j] = True
            w_cnt += BFS(i, j, "W")

print(w_cnt, b_cnt)