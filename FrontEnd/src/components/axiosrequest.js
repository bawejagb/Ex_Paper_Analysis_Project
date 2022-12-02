import axios from "axios";  
var FormData = require('form-data');
const  multipaperrequest=(files,setDataProp)=>{
  var result;
    var data = new FormData();
    for (var i=0; i<files.length; i++){
        data.append("files", files[i],{
            contentType: "application/pdf",
        });
    }
    console.log(...data);

var config = {
  method: 'post',
  url: 'https://efb7-2409-4055-1b-bd52-c64-1657-9bb7-84f3.ngrok.io/multiplepapertopics',
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'multipart/form-data',
  },
  data : data
};

axios(config)
.then(function (response) {
   //result=response.data;
   setDataProp(response.data);
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log("error at axios request ,"+error);
});
}
export default multipaperrequest;