"""
1. 아이디어
- B의 가장 큰 수에 A의 가장 작은 수를 매칭
- A를 정렬하고 B의 큰수를 찾아서 거기다가 곱하기
2. 시간복잡도
- 이중 for 문으로 O(N^2)
- A정렬 O(NlogN)
- N이 50 이므로 2500*50 625,000이라 통과
3. 자료구조
- int b의 최댓값
- int 총합
4. 문제 설명
- N, A, B가 주어지며 S는 A[0]*B[0] + A[1]*B[1] ...인데 A만 정렬해서  S의 최솟값 출력
1 1 0 1 6
2 7 8 3 1
"""
import sys 
input = sys.stdin.readline

N = int(input())
A = list(map(int, input().split()))
B = list(map(int, input().split()))

A.sort()
b_max = 0
S = 0
for a in A:
    b_max = 0
    for b in B:
        b_max = max(b_max, b)
    B.remove(b_max)
    S += a * b_max
print(S)
