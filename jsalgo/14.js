/* 
1. 아이디어
- 1,1 에서 #이 아닌곳으로 해당 점수를 최대한 많이 먹자 중복방문도 됨
- 단순 bfs인데 #을 만나면 그만두게끔 근데 최종위치가 nm이 아니면 0-1
2. 시간복잡도

3. 문제 설명
- n * m 크기로 지도가 되어있음 각 칸에는 숫자와 #이 있음 #는 못지나가며, 숫자는 잡는 물고기 수 
- 1,1에서 출발해서 n,m으로 이동할 때 가장 많이자는것 경로가 없으면 -1반환
*/
function solution(data) {
  dx = [1, 0, -1, 0];
  dy = [0, 1, 0, -1];
  n = data.length;
  m = data[0].length;
  var visited = Array(n)
    .fill()
    .map(() => Array(m).fill(false));
  var result = 0
  var last = false
  function dfs(y, x, visited) {
    if (y == n - 1 && x == m - 1) { //끝까지 가봤나 체크
      last = true
    }

    for (let i = 0; i < 4; i++) {
      var ex = x + dx[i];
      var ey = y + dy[i];
      if (0 <= ex && ex < m && 0 <= ey && ey < n && data[ey][ex] !== "#") {
        if (visited[ey][ex] == false) {
          visited[ey][ex] = true
          result += data[ey][ex]
          dfs(ey,ex, visited)
          // visited[ey][ex] = false
        }
      }
    }
  }
  visited[0][0] = true
  result += data[0][0]
  dfs(0, 0, visited)

  return last ? result : -1;
}

a = solution([[1, 3, "#"], [0, "#", 2], [0, 1, 1]]);
console.log(a);
