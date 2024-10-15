"""
1. 문제설명
- atm기 앞 사람이 N명이 서있음 (1 ~ N) 각 사람마다 Pi분의 돈 인출 시간이 걸림
- 각 사람이 기다리는 시간을 모두 더했을 때 최소가 나오게 해야함
2. 아이디어
- 최소시간 구하기 즉 그리디 
- 정렬 후, 부분합을 더하기
- 1,000이라 정렬 nlogn + for문
3. 시간복잡도
"""
import sys
input = sys.stdin.readline

N = int(input())
time = list(map(int, input().split()))
print(time)