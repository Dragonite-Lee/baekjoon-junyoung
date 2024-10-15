"""
1. 문제설명
- 문자열 s와 p가 주어지면 p가 s의 부분 문자열인지 검사
- p가 s의 부부 문자열이면 1 아니면 0
2. 아이디어
- kmp를 이용해보자
- kmp를 하면서 찾으면 그냥 바로 return
3. 시간복잡도
"""

import sys
input = sys.stdin.readline

S = input().strip()
P = input().strip()

def make_pattern(pattern):
  len_pattern = len(pattern)
  result = [0] * len_pattern
  leng = 0 # 이전까지 가장 긴 접두사
  index = 1
  while index < len_pattern:
    if pattern[index] == pattern[leng]:
      leng += 1
      result[index] = leng
      index += 1
    else:
      if leng != 0:
        #leng이 0이 아니란 건 이전 인덱스까진 같았다는 걸 의미
        leng = result[leng-1]
      else:
        #이전 인덱스에서도 같지 않음
        result[index] = 0
        index += 1
  return result

def KMPSearch(pat, txt):
  full = len(txt)
  find = len(pat)

  table = make_pattern(pat)
  i = 0 # txt index
  j = 0 # pat index
  while i < full:
    if pat[j] == txt[i]:
      i += 1
      j += 1
    elif pat[j] != txt[i]:
      if j != 0:
        j = table[j-1]
      else:
        i += 1

    if j == find:
      return 1
  return 0

print(KMPSearch(P, S))