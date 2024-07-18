/*
1.아이디어
- 이중포문 돌리는 걸 하루로 침 while문으로 총기간 잡기
- 이중포문 돌려서 1일때 bfs 넣어 상하좌우 검사
2. 문제설명 
- 인접 귤이 익은 귤이면 썩게, 안익은 귤이면 익게 만듬
- k일 후 판매할 수 있는 귤의 총합 판매가능 귤 없으면 -1
- 100 * 100 에 k = 10

3. 자료구조
*/
function solution(data) {
  var m = data[0]
  var n = data[1]
  var day = data[2]
  var maped = data[3]
  var result = 0
  var visited = Array(n).fill().map(() => Array(m).fill(false))
  function bfs(y, x) {
    var dx = [1, 0, -1, 0]
    var dy = [0, 1, 0, -1]

    var qu = []
    qu.push([y,x])
    // console.log("시작")
    while (qu.length > 0) {
      [y,x] = qu.shift()
      // console.log(y,x)
      for (let i = 0; i < 4; i++) {
        var ex = x + dx[i];
        var ey = y + dy[i];
        if (0 <= ex && ex < m && 0 <= ey && ey < n && visited[ey][ex] === false) {
          // console.log(ey, ex)
          if (maped[ey][ex] == 0) {
            maped[ey][ex] = 1
            visited[ey][ex] = true
          } else if (maped[ey][ex] == 1) {
            maped[ey][ex] = -1
            maped[y][x] = -1
            visited[ey][ex] = true
          } 
        }
      }
    }
    
  }
  // console.log(maped)

  while (day > 0) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (maped[i][j] === 1 && visited[i][j] == false) {
          bfs(i, j)
        } else if (maped[i][j] === -1 && visited[i][j] == true) {//옆의 1때메 변한 -1
          bfs(i, j)
        }
      }
    }
    console.log(maped)
    // console.log(visited)
    console.log("끝")
    day -= 1
    visited = Array(n).fill().map(() => Array(m).fill(false))
  }
  // console.log(maped)
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maped[i][j] == 1) {
        result += 1
      }
    }
  }
  return result
}

a = solution([7, 5, 4, [[0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]])
console.log(a)
// day를 정해서 1일차 원래 준 위치에서 상하좌우 움직였는데 그게 범위안에 있고, 썩은 귤이 아니다 0인 귤이다
// 행위들 나열
// 1옆의 1들은 썩음-1이됨
// 1옆의 0들은 익음1이됨
// 맵을 싹 돌면서 1을 찾으면 bfs가 들어감 1인곳 상하좌우가 0이면 0인애들 1로 바꿈 1이면 1인곳 -1로