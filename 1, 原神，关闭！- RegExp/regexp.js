const reg = /.*((#(F[A-F])(F[A-F])(F[A-F]))|(白色)).*(原神|OP).*启.*动.*/gi

let sentence = [" （#FAFBFC) 原神，启启启动！","白色，我超，居然是op！不管你启不启动，这下不得不启动了！ ","这不是我们原神的山里灵活吗，下次启启启动记得标明出处#FFACKU"," 这次即使看到白色的东西，我都不可能启动了。（蓄力）Genshin`，启动！你看，没有启动吧。"];

sentence.forEach((item)=>{
    console.log(item.match(reg));
})
