"""
1. 문제설명
- 크기는 같고 1번부터 n번까지 증가하는 순서대로 벨트에 실려 전달됨
- 한방향이라 1번부터 상자 내릴 수 있음 근데? 순서대로 내려서 트럭에 싣으면 안됨 따라서 미리 알려준 순서로 실어야함
- 보조 컨테이너 벨트에 잠시 둘 수 있음 근데 애는 스택구조임 마지막에 넣은애부터 뺄 수 있음
- 이거이용해도 순서대로 못하면 안함
- 123서브에 넣음 
- 4맞음
- 서브에서 꺼냄 3이네? 맞네 넣음
- 
2. 아이디어
- list 사용해서 list에 append 하고 pop로 꺼내다가 요소가 둘다 안되면 끝
- order는 1,000,000
- 결국 스택에 넣고 스택 젤 마지막거랑 
"""

def solution(order):
    answer = 0
    len_order = len(order)

    main_container = [i for i in range(len_order,0, -1)]

    sub_container = []
    order_index = 0
    while True:

        if main_container:
          main_container_pop = main_container.pop()
          if order[order_index] == main_container_pop:
              order_index += 1
              answer += 1
          else:
              if sub_container:
                  sub_container_pop = sub_container.pop()
                  if order[order_index] == sub_container_pop:
                      order_index += 1
                      answer += 1
                      main_container.append(main_container_pop)
                  else:
                      sub_container.append(sub_container_pop)
                      sub_container.append(main_container_pop)
              else:
                  sub_container.append(main_container_pop)
        else:
            if sub_container:
                sub_container_pop = sub_container.pop()
                if order[order_index] == sub_container_pop:
                    order_index += 1
                    answer += 1
                else:
                    break
            else:
                break
    return answer

print(solution([4, 3, 1, 2, 5]))