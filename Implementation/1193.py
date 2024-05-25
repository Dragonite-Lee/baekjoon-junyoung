"""
1. 아이디어
- for문을 돌리면서 합을 구하는데 합을 구한게 입력받은 수 보다 큰지 확인
- 그때 sum과 index구해서 결과 도축
2. 시간복잡도
- for문이라 o(N) 10,000,000이라 통과
3. 자료구조
- sum과 index 합과 합일 때 숫자 int
"""
import sys 
input = sys.stdin.readline

X = int(input())
sum = 0
index = 0
while X > sum:
  index += 1
  sum += index

dif = sum - index
cnt = X - dif - 1
if index % 2 == 0:
  a=1+cnt
  b=index-cnt
else:
  b=1+cnt
  a=index-cnt
print("%d/%d"%(a,b))