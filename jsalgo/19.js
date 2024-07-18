function solution(data) {
 var result = 0
 var sorted_data = data[0].sort((a,b) => b-a) 
 var cut = data[1]
 var index = 0
 console.log(sorted_data)
 while (cut != 0) {
  if (cut >= sorted_data[index]) {
    cut -= sorted_data[index]
    result += 1
  } else {
    index += 1
  }
 }
 return result
}


a = solution([[45, 5, 3, 15], 100])
console.log(a)