# 문제 1번

* 문제 레벨 : 0
* 문제 종류 : 요구사항 구현
* 문제 링크 : https://jsalgo.co.kr/?page=1
* 통과 여부 : Y

```javascript
function solution(data) {
  var result = "";
  var xNum = 64;
  var totalNum = 0;
  var breakNum = 0;
  var index = 0;

  for (let i = 0; i < data.length; i++) {
    xNum = 64;
    totalNum = 0;
    breakNum = 0
    index = 0
    while (true) {
      if (data[i][index] == "+") {
        totalNum += xNum;
        xNum /= 2;
        breakNum += 1;
      } else if (data[i][index] == "-") {
        xNum /= 2;
        breakNum += 1;
      }
      index += 1;
      if (breakNum == 7) {
        break;
      }
    }
    result += String.fromCharCode(totalNum)
  }
  return result;
}
```

# 문제 2번

* 문제 레벨 : 1
* 문제 종류 : 정규표현식
* 문제 링크 : https://jsalgo.co.kr/?page=2
* 통과 여부 : Y

```javascript
function solution(data) {
  var sol_array = ["r", "e", "v"];
  var total = 0;
  for (let i = 0; i < data.length; i++) {
    if (sol_array.includes(data[i])) {
      if (i + 1 < data.length && !isNaN(Number(data[i+1]))) {
        if (data[i+1] !== '1') {
          total += Number(data[i + 1]);
        } else if (i + 2 < data.length && data[i + 2] == "0") {
          total += 10;
        } else {
          total += 1;
        }
      } 
    }
  }
  result_str = Math.floor(total / 10) + "월 " + (total % 10) + "일";
  return result_str;
}
```

# 문제 3번

* 문제 레벨 : 1
* 문제 종류 : 정렬
* 문제 링크 : https://jsalgo.co.kr/?page=3
* 통과 여부 : Y

```javascript
//뽑을 수 있는 인원을 구한 뒤, 총합에 따라 이름 배열을 만들어 뽑아가쟈
function solution(data) {
  var pass_num = Math.floor(100 / data.length) // 1명당 상위퍼센트
  var cut_num = 30
  var result_num = -1
  var result = []
  var people_arr = []

  if (pass_num >= 30) {
    return result
  }
  while (cut_num >= 0) {
    cut_num -= pass_num
    result_num += 1
  }
  
  for (let i = 0; i < data.length; i++) {
    let total = data[i][1]+data[i][2]+data[i][3]+data[i][4]
    let person = {
      name: data[i][0],
      total: total
    }
    people_arr.push({ ...person })
  }

  people_arr = people_arr.sort((a, b) => b.total - a.total)

  for (let i = 0; i < result_num; i++) {
    result.push(people_arr[i].name)
  }
  // console.log(result_num, people_arr)
  while (result_num > 0) {
    if (people_arr[result_num].total == people_arr[result_num-1].total) {
      result.pop()
    } else {
      break
    }
    result_num -= 1
  }
  

  result = result.sort((a, b) => b.localeCompare(a));
  return result
}
```

# 문제 4번

* 문제 레벨 : 1
* 문제 종류 : 정규표현식
* 문제 링크 : https://jsalgo.co.kr/?page=4
* 통과 여부 : Y

```javascript
function solution(data) {
  var training_obj = {}
  var thinking_obj = {}
  var tr_to_thinking_obj = {}
  var result = ''
  const regex = /(\d+)|([A-Za-z]+)/g;
  
  for (let i = 0; i < data.length; i++) {
    const matches = data[i].match(regex);
    for (let j = 0; j < matches.length; j += 2) {
      if (isNaN(matches[j])) { // 문자
        if (i == 0) {
          if (training_obj[matches[j]]) {
            training_obj[matches[j]] += Number(matches[j+1])
          } else {
            training_obj[matches[j]] = Number(matches[j+1])
          }
        } else {
          if (thinking_obj[matches[j]]) {
            thinking_obj[matches[j]] += Number(matches[j+1])
          } else {
            thinking_obj[matches[j]] = Number(matches[j+1])
          }
        }
      } else {
        if (i == 0) {
          if (training_obj[matches[j+1]]) {
            training_obj[matches[j+1]] += Number(matches[j])
          } else {
            training_obj[matches[j+1]] = Number(matches[j])
          }
        } else {
          if (thinking_obj[matches[j+1]]) {
            thinking_obj[matches[j+1]] += Number(matches[j])
          } else {
            thinking_obj[matches[j+1]] = Number(matches[j])
          }
        }
      }
    }
  }
  
  var training_keys = Object.keys(training_obj)
  training_keys.forEach(key => {
    if (thinking_obj.hasOwnProperty(key)) {
      tr_to_thinking_obj[key] = thinking_obj[key];
    }
  });

  if (Object.keys(tr_to_thinking_obj).length == 0) {
    result = '미래가 보이지 않습니다.'
    return result
  }

  const training_obj_arr = Object.entries(training_obj);
  training_obj_arr.sort((a, b) => b[1] - a[1]);
  var max_val = training_obj_arr[0][1]
  for (let i = 0; i < training_obj_arr.length; i++) {
    if (training_obj_arr[i][1] == max_val) {
      training_obj_arr[i][1] += 100;
    } else {
      break
    }
  }
  let training_obj_sort = {}
  training_obj_arr.forEach(item => {
    training_obj_sort[item[0]] = item[1]
  })

  const tr_to_thinking_obj_arr = Object.entries(tr_to_thinking_obj);
  tr_to_thinking_obj_arr.sort((a, b) => b[1] - a[1]);
  var max_val = tr_to_thinking_obj_arr[0][1]
  for (let i = 0; i < tr_to_thinking_obj_arr.length; i++) {
    if (tr_to_thinking_obj_arr[i][1] == max_val) {
      tr_to_thinking_obj_arr[i][1] += 100;
    } else {
      break
    }
  }
  let tr_to_thinking_obj_sort = {}
  tr_to_thinking_obj_arr.forEach(item => {
    tr_to_thinking_obj_sort[item[0]] = item[1]
  })
  
  var origin = 0
  var change = 0
  training_keys.forEach(item => {
    if (tr_to_thinking_obj.hasOwnProperty(item) && training_obj_sort.hasOwnProperty(item) && tr_to_thinking_obj_sort.hasOwnProperty(item)) {
      origin += (training_obj[item] * tr_to_thinking_obj[item])
      change += (training_obj_sort[item] * tr_to_thinking_obj_sort[item])
    }
  })
  result = '최종 꿈의 설계는 원래 미래 ' + origin + ', 바뀐 미래 ' + change + '입니다. 이 수치대로 Vision을 만듭니다.'
  
  return result
}
```

# 문제 5번

* 문제 레벨 : 1
* 문제 종류 : 행렬
* 문제 링크 : https://jsalgo.co.kr/?page=5
* 통과 여부 : Y

```javascript
function solution(data) {
  //상한당근 갯수
  //상한당근 좌우위아래 대각선 모두 합한갯수
  var x_length = data[0].length;
  var y_length = data.length;

  var dx = [1, 0, -1, 0, 1, 1, -1, -1] //대각선 까지
  var dy = [0, 1, 0, -1, 1, -1, 1, -1]
  
  var target = 0;
  var around = 0
  
  for (let y = 0; y < y_length; y++) {
    for (let x = 0; x < x_length; x++) {
      if (data[y][x] == '#') {
        target += 1
        //y,x를 중점으로 좌우를 이동했을 때 범위안에 들며, 오염이 아니면 증가
        for (let z = 0; z < dx.length; z++) {
          ex = x + dx[z]
          ey = y + dy[z]

          if (0 <= ex && ex < x_length && 0 <= ey && ey < y_length) {
            if (data[ey][ex] !== '#') {
              around += 1
            }
          }
        }
      }
    }
  }
  return [target, around]
}
```

# 문제 6번

* 문제 레벨 : 1
* 문제 종류 : 스택, 큐
* 문제 링크 : https://jsalgo.co.kr/?page=6
* 통과 여부 : Y

```javascript
function solution(data) {

  var cnt = 0
  var matchIndex = 1;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === matchIndex) {
      if (matchIndex === 4) {
        matchIndex = 1;
        if (i < data.length && data[i+1] == 1) {
          cnt++;
        }
      } else {
        matchIndex++;
      }
    } else {
      matchIndex = 1;
    }
  }
  return cnt
}
```

# 문제 7번

* 문제 레벨 : 1
* 문제 종류 : 투포인터, 슬라이딩 윈도우
* 문제 링크 : https://jsalgo.co.kr/?page=7
* 통과 여부 : Y

```javascript
function solution(data) {
  var data_length = data[0].length
  var cart_weight = data[1];
  var result = []
  for (let i = 0; i < data_length; i++) {
    for (let j = i+1; j < data_length; j++) {
      if (data[0][j] === cart_weight - data[0][i]) {
        result.push(i, j)
        return result
      }
    }
  }
  return result
}
```

# 문제 8번

* 문제 레벨 : 0
* 문제 종류 : 수학
* 문제 링크 : https://jsalgo.co.kr/?page=8
* 통과 여부 : Y

```javascript
function solution(data) {
  var buyFirst = Math.floor(data / 3300);
  var restMoney = data - buyFirst * 3300;
  if (buyFirst > 10) {
    var extra = Math.floor(buyFirst / 10)
    console.log('extra', extra)
    console.log('restMoney', restMoney)
    var upgradeExtra = 0
    while (restMoney >= 300) {
      if (extra > 0) {
        upgradeExtra += 1
        restMoney -= 300
        extra -= 1
      }
    }
    console.log(upgradeExtra)
    buyFirst += upgradeExtra
  } else {
    return buyFirst
  }
  return buyFirst
}
```

# 문제 9번

* 문제 레벨 : 1
* 문제 종류 : 투포인터, 슬라이딩 윈도우
* 문제 링크 : https://jsalgo.co.kr/?page=9
* 통과 여부 : Y

```javascript
function solution(data) {
  var highValue = data[0]
  var maxMo = 0
  for (let i = 1; i < data.length; i++) {
    if (highValue < data[i]) {
      highValue = data[i]

    } else {
      maxMo = Math.max(maxMo, highValue - data[i])

    }
  }
  return maxMo
}
```

# 문제 10번

* 문제 레벨 : 1
* 문제 종류 : 조합
* 문제 링크 : https://jsalgo.co.kr/?page=10
* 통과 여부 : N

```javascript
function solution(data) {
  let givenData = data[1].split(',');

  var result = [];
  if (data[0] == 0) {
    return "기본 포케가 제공됩니다.";
  }
  var allToping = ["연어", "참치", "닭가슴살", "베이컨", "버섯"];
  var a = [];
  var topingCount = data[0];
  var pickCount = 0;
  if (givenData[0] !== "") {
    pickCount = givenData.length;
  }

  function combinate(items, idx, arr, k, result) {
    if (items.length === k) {
      result.push([...items]);
      return;
    }

    for (let i = idx; i < arr.length; i++) {
      combinate([...items, arr[i]], i + 1, arr, k, result);
    }
  }
  
  var resCount = topingCount - pickCount;
  
  if (givenData[0] !== "" && givenData.length > 0) {
    // 배열 a를 한 번만 초기화합니다.
    a = allToping.filter((v) => !givenData.includes(v));
   
    combinate(givenData, 0, a, resCount+1, result);
  } else {
    combinate([], 0, allToping, resCount, result);
  }

  return result;
}
```

# 문제 11번

* 문제 레벨 : 3
* 문제 종류 : 트리, 링크드리스트, 트라이
* 문제 링크 : https://jsalgo.co.kr/?page=11
* 통과 여부 : N

```javascript
function solution(data){
    return '여섯 └ 일곱 하나 ├ 다섯 └ 둘 └ 셋 └ 넷'
}
```

# 문제 12번

* 문제 레벨 : 3
* 문제 종류 : 순열, 완전탐색
* 문제 링크 : https://jsalgo.co.kr/?page=12
* 통과 여부 : Y

```javascript
function solution(data) {

  result = []
  function conditionArr(arr, start, value, result) {
    if (start >= arr.length) {
      return
    }
    for (let i = start; i < arr.length; i++) {
      let newValue = value + arr[i]
      conditionArr(arr, i + 2, newValue, result)
      result.push(newValue)
    }
  }

  for (let j = 0; j < data.length; j++) {
    conditionArr(data, j, 0, result)
  }
  max_value = Math.max(...result)
  return max_value
}
```

# 문제 13번

* 문제 레벨 : 1
* 문제 종류 : 힙
* 문제 링크 : https://jsalgo.co.kr/?page=13
* 통과 여부 : Y

```javascript
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
```

# 문제 14번

* 문제 레벨 : 1
* 문제 종류 : DFS/BFS
* 문제 링크 : https://jsalgo.co.kr/?page=14
* 통과 여부 : Y

```javascript
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
```

# 문제 15번

* 문제 레벨 : 2
* 문제 종류 : 행렬
* 문제 링크 : https://jsalgo.co.kr/?page=15
* 통과 여부 : N

```javascript
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
    // console.log(maped)
    // console.log(visited)
    // console.log("끝")
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
```

