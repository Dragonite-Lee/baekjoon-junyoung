import sys
input = sys.stdin.readline
arr = list(input().rstrip())
# print(arr)
st = []
for i in arr:
  if (i =='(' or i =='['):
    st.append(i)
  else:
    if st:
      st_pop = st.pop()
      if type(st_pop) == int:
        total = st_pop
        while True:
          if st:
            a = st.pop()
            if type(a) == int:
              total += a
            else:
              st.append(a)
              break
          else:
            break
        if st:
          b = st.pop()
          if b == '(' and i ==')':
           st.append(total * 2)
          elif b == '[' and i ==']':
            st.append(total * 3)
        else:
          st.append('x')
          break
      else:
        if st_pop == '(' and i ==')':
          st.append(2)
        elif st_pop == '[' and i ==']':
          st.append(3)
        else:
          st.append('x')
          break
    else:
      break
def result_count(arr):
  if all(isinstance(item, int) for item in arr):
    return sum(arr)
  else:
    return 0

print(result_count(st))
