"""
1. 문제설명
- N이 주어지면 소수의 연속합으로 구해지는 경우의 수 구하기
2. 아이디어
- 일단 에라토스테네스의 채로 소수 구하기
- start, end 0부터 시작해서  sum이 현재 N보다 작으면 end을 늘리고 같거나 크면 start을 늘림
3. 시간복잡도
- O(N) + O(logN)
"""
import sys
input = sys.stdin.readline

N = int(input())

a = [False, False] + [True] * (N-1) # 0,1은 소수가 아니니까 false로 채우고 그뒤로 2부터 N까지 True로 채움
prime_num = []

for i in range(2, N+1):
    if a[i]:# 2부터 시작해서 2는 소수니까 prime에 넣고 2의 배수는 다 지우기
        prime_num.append(i)
        for j in range(2*i, N+1, i):
            a[j] = False
# print(a)
# print(prime_num)
result = 0
start = 0
end = 0
while end <= len(prime_num):
  total = sum(prime_num[start:end])
  if total == N:
    result += 1
    start += 1
  elif total < N:
    end += 1
  else:
    start += 1
print(result)