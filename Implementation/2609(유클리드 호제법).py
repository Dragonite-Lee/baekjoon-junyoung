import sys
import math
input = sys.stdin.readline
#유클리드 호제법으로 최대공약수 구해서 두수를 곱한걸 최대공약수로 나누면 최소 공배수
x, y = map(int, input().split())

def gcd(a, b): # a가 b보다 큰 수라는 가정
  while b > 0:
    a, b = b, a % b
    print(a, b)
  return a

def lcm(a, b):
  return math.floor((a * b) / gcd(a, b))
if x < y:
  x,y = y,x

print(gcd(x, y))
print(lcm(x, y))