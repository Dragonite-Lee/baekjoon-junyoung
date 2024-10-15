"""
1. 문제설명
- 중위에서 후위 표기식으로 바꾸려면 우선순위에 따라 괄호로 묶고, 괄호 안의 연산자를 괄호 오른쪽으로 옮겨주기
2. 아이디어
- 기본적으로 우선순위가 높은애들이 후위 표기할때 문자열 바로 뒤에 붙음
- ( 는 추가만 하기
- * / 는 전 요소가 *나 / 일때 문자열에 모두 붙여버리기
- + - 는 전 요소가 (가 아닌 이상 우선 순위가 젤 낮으니까 자기보다 높은것들 다 추가해주기
- )는 (를 만날때까지 모든 연산자를 추가해주고 (를 제거해주기 
3. 시간복잡도
"""
import sys
input = sys.stdin.readline
arr = list(input().strip())
# print(arr)
stack = []
result = ''
for item in arr:
  if item.isalpha():
    result += item
  else:
    if item == '(':
      stack.append(item)
    elif item == '*' or item == '/':
      while stack and (stack[-1] == '*' or stack[-1] == '/'):
        result += stack.pop()
      stack.append(item)
    elif item == '+' or item == '-':
      while stack and stack[-1] != '(':
        result += stack.pop()
      stack.append(item)
    else:
      while stack and stack[-1] != '(':
        result += stack.pop()
      stack.pop()
while stack:
  result += stack.pop()

print(result)