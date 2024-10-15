"""
1.문제설명
- 크리보드엔 버튼이 4개만 있음
- A출력, ctrl-A 화면전체선택 , 
- ctrl-C 선택내용 버퍼에 복사, ctrl-V 버퍼가 비어있지않은 경우엔 화면에 출력된 문자열 바로 뒤에 버퍼의 내요을 붙임
- N번 눌러서 화면에 출력된 A개수를 최대로 하기
"""
import sys
input = sys.stdin.readline
N = int(input())


dp = [i for i in range(N+1)]

for i in range(7, N+1):
  dp[i] = max(dp[i-4]*3, dp[i-3]*2, dp[i-5]*4)

print(dp[N])