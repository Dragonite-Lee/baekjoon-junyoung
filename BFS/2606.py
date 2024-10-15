import sys
input = sys.stdin.readline

computer_num = int(input())
line = int(input())

graph = [[] for _ in range(computer_num+1)]
visited = [False for _ in range(computer_num+1)]
for _ in range(line):
  a, b = map(int, input().split())
  graph[a].append(b)
  graph[b].append(a)

def bfs(start):
  dq = [start]
  result = 0
  while dq:
    pop_element = dq.pop()
    result += 1
    for com in graph[pop_element]:
      if visited[com] == False:
        dq.append(com)
        visited[com] = True

  return result

visited[1] = True
print(bfs(1)-1)