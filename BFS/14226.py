"""
1. 아이디어
- bfs
- 
"""
import sys
from collections import deque
input = sys.stdin.readline

S = int(input())
visited = [[False] * 1001 for _ in range(1001)]
dq = deque([[1,0,0]])

visited[1][0] = True
while dq:
  screen, clipboard, cnt = dq.popleft()

  if screen == S:
    print(cnt)
    break

  for i in range(3):
    if i == 0:
      new_clipboard, new_screen = screen, screen
    elif i == 1:
      new_screen, new_clipboard = screen + clipboard, clipboard
    elif i == 2:
      new_screen, new_clipboard = screen - 1, clipboard
    if 0 <= new_screen < 1001 and 0 <= new_clipboard < 1001 and visited[new_screen][new_clipboard] == False:
      visited[new_screen][new_clipboard] = True
      dq.append([new_screen, new_clipboard, cnt + 1])