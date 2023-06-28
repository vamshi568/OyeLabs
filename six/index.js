const arr = [1, 2, 3, 4,6, 7, 8, 9,10]; //for example i took only 10 number and 6 is missing
let m=arr.length+1 //this works if only the arr is from 1 and conigitive numbers 
//or you can put m as the max number
const totalsum=(m*(m+1))/2
const total = arr.reduce((a, b) => a + b, 0);
const miss = totalsum - total;
console.log('Missing number ', miss);
