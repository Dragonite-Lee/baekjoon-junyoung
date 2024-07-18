"""
1. 아이디어
- 대칭이여야 함 
- 문자열의 갯수를 파악하고, 짝수이면 2개씩 있는지 파악 홀수일땐 1개를 제외하고 다 2개씩 있어야 함
- 안되면 I'm Sorry Hansoo 반환 -> 안되는 조건? 짝인데 홀수개 홀수인데 홀수가 1개이상일떄
2. 시간복잡도
- 최대 50글자인데, O(4n)이므로 O(N)이라 통과
3. 자료구조
- result str
- len int
- result_condition boolean
4. 문제설명
- 한수 영어 이름의 알파벳 순서를 적절히 바꿔서 팰린드롬을 만드려고 함
- 팰린드롬이란 거꾸로 읽어도 같은걸 말함 
"""
import sys
import collections
input = sys.stdin.readline

str = list(input().strip())
# print(str)
result = ''
len_str = len(str)
counter = collections.Counter(str)
re_bo = True
# print(counter.values())
if len_str % 2 == 0: # 갯수가 짝수개
    for i in list(counter.values()):
        if i % 2 != 0: #에러
            re_bo = False
    key_list = list(counter.keys())
    key_list.sort()
    for i in key_list:
        cnt = counter[i] // 2
        result += i*cnt
    reverse_result = result[::-1]
    result += reverse_result
else:
    odd_cnt = 0
    for i in list(counter.values()):
        if i % 2 != 0: #에러
            odd_cnt += 1
    if odd_cnt != 1: #홀수일 땐 홀수개가 하나만 있어야 함
        re_bo = False
    odd_str = ''
    key_list = list(counter.keys())
    for i in key_list:
        if counter[i] % 2 != 0:
            odd_str += i
    key_list.sort()
    for i in key_list:
        cnt = counter[i] // 2
        result += i*cnt
    reverse_result = result[::-1]
    result += odd_str
    result += reverse_result

if re_bo:
    print(result)
else: 
    print("I'm Sorry Hansoo")
