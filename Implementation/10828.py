"""
1. 아이디어
- input을 받고 그만큼 반복할건데, 각각 명령어에 따른 분기처리 해줌
- array만들어서 조작
2. 시간복잡도
- for문하나 돌리니까 10,000이라 통과
3. 자료구조
- 내부 array int[]
4. 문제설명
정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

push X: 정수 X를 스택에 넣는 연산이다.
pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
size: 스택에 들어있는 정수의 개수를 출력한다.
empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
"""
import sys
input = sys.stdin.readline

N = int(input())
result = []
for _ in range(N):
    do = input().split()
    if do[0] == 'push':
        result.append(do[1])
    elif do[0] == 'pop':
        if result:
            pop_element = result.pop()
            print(pop_element)
        else:
            print(-1)
    elif do[0] == 'size':
        print(len(result))
    elif do[0] == 'empty':
        if result:
            print(0)
        else:
            print(1)
    else:
        if result:
            pop_element = result.pop()
            print(pop_element)
            result.append(pop_element)
        else:
            print(-1)