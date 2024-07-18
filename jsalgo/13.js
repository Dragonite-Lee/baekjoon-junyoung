/*
1. 아이디어
- 최대 개수 이므로 자기 무게가 최대를 넘으면 그냥 바로 보냄
- 안넘으면 배열에 넣었다가 무게 차면 나가기
2. 시간복잡도

3. 최소 무게 제한 K가 존재하는데 k이하인 애들은 더해서 K가 되면 비행정 탑승 가능 최대 비행정 개수
*/

function solution(data) {
  var qu = []
  var result = 0
  var cut = data[1]
  var total = 0
  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i] >= cut) {
      result += 1
    } else {
      qu.push(data[0][i])
      total += data[0][i]
    } 
  }

  //무게가 안넘는 애들은 큐에 담김
  if (qu) {
    qu.sort((a, b) => a - b)
    
    for (let i = 0; i < qu.length; i++) {
      for (let j = i; j < qu.length; j++) {
        if (qu[i] + qu[j] >= cut) {
          result += 1
          qu = qu.filter((data) => data !== qu[i])
          qu = qu.filter((data) => data !== qu[j])
          console.log("2",qu)
          break
        }
      }
    }
  }

  return result
}

a = solution([[46, 26, 37, 32, 10],30])
console.log(a)