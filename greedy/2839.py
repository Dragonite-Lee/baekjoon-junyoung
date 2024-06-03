"""
1. 아이디어
- 해당 경우는 case가 2개니까 최대치로 다 나눈다음 0이면 그만두지만 아니면 한개씩 줄여가며 3의 갯수 세기
2. 시간복잡도
- N은 3부터 5000 
- 5000을 5로 나눈 몫은 1000이므로 O(1000)
3. 자료구조
- 5로 나눈 몫 int
- 5로 나눈 나머지 int
4. 문제설명
설탕은 3키로와 5키로가 있음 N이 주어지면 최소한의 경우로 설탕배달을 하게끔 하기
"""
import sys
input = sys.stdin.readline

N = int(input())

max_value = N // 5
max_emp = N % 5

while True:
    if max_emp == 0: #N이 5로만 딱 맞아 떨어지는 경우
        print(max_value)
        break
    elif max_emp % 3 == 0:
        print(max_value + (max_emp // 3))
        break

    if max_value == 0: #5와 3으로 나눌 수 없는 경우
        print(-1)
        break

    max_emp += 5 #5로만 이루어져 있지 않을 때,
    max_value -= 1
    if max_emp % 3 == 0:
        print(max_value + (max_emp // 3))
        break