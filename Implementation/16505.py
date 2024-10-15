"""
1. 문제설명
opcode rD rA rB" 또는 "opcode rD rA #C"
- 기본적으로 rA rB의 두 수 또는 rA와 #C와 연산 수행하고 rD에 저장함
- 0~4 opcode 4번이 0이면 rB를 1이면 #C사용
- 5 항상 0
- 6~8 결과값 저장 rD의 번호
- 9~11 연산에 사용되는 rA 사용안하면 000
- 12~15 4번이 0이면 12~14는 rB 이고 15는 0 1이면 12~15가 #C
"""
import sys
input = sys.stdin.readline

N = int(input())

opcode = {
  'ADD' : '0000',
  'SUB' : '0001',
  'MOV' : '0010',
  'AND' : '0011',
  'OR' : '0100',
  'NOT' : '0101',
  'MULT' : '0110',
  'LSFTL' : '0111',
  'LSFTR' : '1000',
  'ASFTR' : '1001',
  'RL' : '1010',
  'RR' : '1011'
}

for _ in range(N):
  result = ''
  c_ok = False
  b_false_c_true = False
  code = input().strip().split(' ')
  #opcode 0~4
  if code[0][-1] == 'C':
    result += opcode[code[0][0:-1]]
    result += '1'
    c_ok = True
  else:
    result += opcode[code[0]]
    result += '0'
  #5
  result += '0'
  #rD 6~8
  format_str = bin(int(code[1]))[2:].zfill(3)
  result += str(format_str)
  #rA 9~11
  format_str = bin(int(code[2]))[2:].zfill(3)
  result += str(format_str)
  #rB or #C 12~15
  if c_ok == True:
    format_str = bin(int(code[3]))[2:].zfill(4)
    result += str(format_str)
  else:
    format_str = bin(int(code[3]))[2:].zfill(3)
    result += str(format_str)
    result += '0'
  print(result)

# 0010 1 0 001 000 0101
# 0010 1 0 001 000 0001
# 0010 1 0 010 000 1010
# 0000 0 0 011 001 0100
# 0001 0 0 100 001 0100


# 0010100100000010
# 0000000110010010
# 0001001000010010