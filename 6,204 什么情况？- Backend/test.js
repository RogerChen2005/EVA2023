const axios = require("axios");

axios.post("http://127.0.0.1:3000/check",{
    "source": "ZJUEVA204"
}).then(
    (res)=>{
        console.log(res.data);
    }
);

axios.post("http://127.0.0.1:3000/status",{
    "server": "ZJUEVA204"
}).then(
    (res)=>{
        console.log(res.data);
    }
);
