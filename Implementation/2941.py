"""
1. 아이디어
- replace함수를 이용해서 for문을 돌려 해당되는 문자열 제거
- dz=dz=z= 같은 경우는 dz=을 두고 z= 이 지워지니 break문
2. 시간복잡도
- for문에 while문인데 100글자니까 많이 돌려도 100번
3. 자료구조
- result int
- 문자열 str[]
4. 문제설명
- 알파벳이 주어지는데, 크로아티아 알파벳이면 하나로 묶어서 세고, 아니면 하나씩 세기
"""
import sys
input = sys.stdin.readline

str = input().strip()
result = 0
cro_str = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z=']
copy_str = ''
while True:
    before_result = result
    for item in cro_str:
        copy_str = str.replace(item, ' ', 1)
        # print(copy_str, str)
        if str != copy_str:
            result += 1
            str = copy_str
            break
    if before_result == result:
        break
alpa1_str = copy_str.replace('-','')
alpa2_str = alpa1_str.replace('=','')
strip_str = alpa2_str.replace(' ','')
print(result + len(strip_str))