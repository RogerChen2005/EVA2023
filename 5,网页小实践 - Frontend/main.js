let content = [];

function generate(){
    let count = Number(document.getElementById("input").value);
    console.log("Generate "+count+" Blocks.");
    if(count){
        let node = document.getElementById("container");
        let width = parseInt(node.offsetWidth / 120) * 120;
        let length = content.length;
        console.log(width);
        recalc();
        for(let i = 0;i < count;i++){
            let div = document.createElement("div");
            div.className = "block";
            div.no = length+i;
            div.onclick = (e)=>{
                del(div.no);
            };
            let offset = length * 120;
            let offsetStr = `translate(${parseInt(offset % width)}px,${parseInt(offset / width) * 120}px)`;
            div.style.transform = offsetStr;
            content.push(div);
            setTimeout(()=>{
                node.appendChild(div)
            },50 * i);
            length++;
        }
    }
}


function recalc(){
    let length = content.length;
    let width = parseInt(document.getElementById("container").offsetWidth / 120) * 120;
    for(let i = 0;i < length;i++){
        let offset = i * 120;
        let offsetStr = `translate(${parseInt(offset % width)}px,${parseInt(offset / width) * 120}px)`;
        content[i].style.transform = offsetStr;
        content[i].no = i;
    }
}

function del(index){
    content[index].remove();
    content.splice(index,1);
    recalc();
}