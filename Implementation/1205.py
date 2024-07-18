"""
1. 아이디어
- append를 하고 정렬 했을때 score를 찾아서 인덱스와 값 반환하고 전체리스트에서 같은게 있나 확인
2. 시간복잡도

3. 자료구조

4. 문제설명
- input으로 리스트의 갯수, 태수의 점수, 랭킹에 들어가는 점수 갯수 주어짐
- 같은 숫자면 태수가 젤 뒤에 배정
- 랭킹에 들어가면 몇등인지 꽉차면 새점수가 더 좋아야 들어갈 수 있음 못들어가면 -1
"""
import sys
input = sys.stdin.readline

N, score, P = map(int, input().split())


find_index = -1
rank = 0
if N > 0:
    all_score = list(map(int, input().split()))
    # print(all_score)
    all_score.append(score)
    all_score.sort(reverse=True)

    for i in range(len(all_score)):
        if all_score[i] == score:
            find_index = i
            rank = i + 1
            break
    # print(all_score, find_index)
    while True:
        if len(all_score) > find_index+1 and all_score[find_index+1] == score:
            find_index += 1
        else:
            break
        if find_index == P:
            break

    if find_index >= P or find_index == -1:
        print(-1)
    else:
        print(rank)
else:
    print(1)