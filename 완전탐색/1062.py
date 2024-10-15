import sys
input = sys.stdin.readline

N, K = map(int,input().split())
str_list = []
for i in range(N):
  str_list.append(input().strip())

def countBits(n):
  cnt = 0
  while n > 0:
    if n & 1:
      cnt += 1
    n = n >> 1
  return cnt

def canLearn(word, can):
  for w in word:
    if w not in can:
      return False
  return True

learn_str = ['a', 'n', 't', 'i', 'c']
str = []
str_arr = []
avail_word = K - 5
result = 0
if avail_word < 0:
  result = 0
else:
  # 배워야하는단어랑 각각 배울단어들
  possible = len(str_list)
  for word in str_list:
    set_clear = set()
    for w in word:
      if w not in learn_str:
        set_clear.add(w)
    if len(list(set_clear)) > avail_word:
      possible -= 1
    else:
      str = [*str, *list(set_clear)]
      str_arr.append(list(set_clear))
  str = list(set(str))
  len_str = len(str)
  if len_str <= avail_word:
    result = possible
  else:
    # 완탐시작
    for i in range(1<<len_str):
      sum = 0
      if countBits(i) == avail_word:
        plus_arr = []
        for j in range(len_str):
          if i & (1<<j):
            plus_arr.append(str[j])
        for w in range(len(str_arr)):
          if canLearn(str_arr[w], plus_arr):
            sum += 1
        if result < sum:
          result = sum

print(result)