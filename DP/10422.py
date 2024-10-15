"""
1. 문제 설명
- ( )로만 이루어진 문자열을 괄호 문자열이라고 함
- 올바른 괄호 문자열이란 열린걸 닫아야 괄호 문자열임
2. 아이디어
- 일단 짝수만 가능함
- n을 괄호의 갯수
- i를 첫번째 괄호가 닫히는 index로 둠
- 해당 위치 dp 값은 dp[i-2] * dp[n-i]
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

T = int(input())

dp = [0 for _ in range(5001)]
dp[0] = 1

for n in range(2, 5001, 2):
  for i in range(2, n+1, 2):
    dp[n] += dp[i-2] * dp[n-i]
  dp[n] = dp[n] % 1000000007

for _ in range(T):
  a = int(input())
  print(dp[a])