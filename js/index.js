var max = 500;
var min = 0;
for (let index = 0; index < 10; index++) {
    min = min + Math.floor(Math.random() * 10)
    if (min>10){
        console.log(min)
        break;
    }

}