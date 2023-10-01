let crypt = "a5c/15bd/151e/1203".split("/");
let key = "3555"
let ans = "";

ans = String.fromCharCode(...crypt.map((value,index)=>{return Number(parseInt('0x'+value,16) / (Number(key[index])+48));}));

console.log(ans);