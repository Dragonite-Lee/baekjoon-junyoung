"""
1. 아이디어
- 점화식을 구하는데, 피보나치 수열 점화식은 An = A(n-1) + A(n-2)
- result에 기본값을 넣고 2부터 반복문을 돌려가며 저장하고 갯수 세기
2. 시간복잡도
- 반복문 한 번 돌리니까 O(N) N은 40 이라 통과
3. 자료구조
- 결과 배열 int[]
4. 문제설명
- 피보나치 수열인데, 0과 1이 몇 번 출력되는지 구하기
"""
import sys
input = sys.stdin.readline

T = int(input())

for _ in range(T):
  result = [[1,0], [0,1]]
  n = int(input())
  for i in range(2, n+1):
    result.append([result[i-1][0] + result[i-2][0], result[i-1][1] + result[i-2][1]])
  print(result[n][0], result[n][1])