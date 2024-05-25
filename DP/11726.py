"""
1. 문제 설명
- 2*n 크기의 직사각형을 1*2 2*1 타일로 채우는 방법의 수를 구하는 프로그램을 작성해라. 

2. 아이디어
- A1 : 1, A2 : 2, A3 : 1+ 2
- An = A(n-1) + A(n-2)
- for문으로 3부터 N까지 돌면서
- 이전값과, 그 이전값을 더해서 저장(이떄 10007로 나눈 나머지값)

3. 시간 복잡도
- for문 한번이라 O(N) → 1000이라 가능

4. 자료구조
- 방법의 수 배열 int[]
"""
import sys
input = sys.stdin.readline

n = int(input())

result = [0, 1, 2]

for i in range(3, n+1):
  result.append(result[i-1] + result[i-2])

print(result[n] % 10007)