"""
1. 문제설명
- 첫 줄 멀티탭 구멍 개수와 전기용품 사용횟수
- 전기용품 이름이 자연수로 주어짐 
2. 아이디어
- 가지고 있는 것 중에 안쓰이는게 있으면 걔부터 아웃
- 남은 전기용품 리스트 중 가장 나중에 출현하는 코드
- 그리디는 어떤걸 기준으로 할건지!!!!
3. 시간복잡도

"""

import sys
input = sys.stdin.readline

N, K = map(int, input().split())
use_list = list(map(int, input().split()))
# print(use_list[3:])
code = []
result = 0 # 코드를 빼는 횟수
for i in range(K):
  # 해당 전기용품의 코드가 꽂혀져 있음
  if use_list[i] in code:
    continue
  
  # 코드 꽂을 자리가 남음
  if len(code) < N:
    code.append(use_list[i])
    continue

  # 코드 꽂을 자리가 없음
  priority = []
  for c in code:
    if c in use_list[i:]:
      priority.append(use_list[i:].index(c)) # 존재하면 존재하는 아이의 인덱스를 저장시키기
      # print(priority)
    else:
      priority.append(101) # 존재하지 않으니까 젤 우선순위
  target = priority.index(max(priority)) # 101이 존재하면 젤 먼저 뽑혀야하니까 뽑혀야할 순번의 인덱스를 젤 크게 잡음
  code.remove(code[target])
  code.append(use_list[i])
  result += 1
      
print(result)