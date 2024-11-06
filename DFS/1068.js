/**
 * 문제설명
 * 트리에서 리프노드란? 자식의 개수가 0인 노드를 뜻함
 * 트리가 주어졌을 때 노드를 하나를 지울건데, 남은 트리에서 리프노드의 개수 구하기
 * 노드를 지우면 모든 자손이 트리에서 제거됨
 * 아이디어
 * 그래프 생성후 없앨 노드에 방문 true로 놓고 dfs해서 갯수세기
 * 시간복잡도
 *
 */
const fs = require('fs');

const [a, arr, b] = fs
  .readFileSync('./js/input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(a);
const delete_node = Number(b);
const tree = arr.split(' ').map(Number); //각 노드의 부모가 주어짐 없으면 -1

let result = 0;
function dfs(k, tree) {
  tree[k] = -2 //삭제한다는 의미
  for (let i = 0; i < tree.length; i++) {
    if (tree[i] === k) {
      dfs(i, tree)
    }
  }
}
dfs(delete_node, tree);
for (let i = 0; i < tree.length; i++) {
  if (tree[i] !== -2 && !tree.includes(i)) {
    result += 1
  }
}

console.log(result)