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
    // console.log(...data);

var config = {
  method: 'post',
  url: 'http://127.0.0.1:8000/multiplepapertopics',
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
  // console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log("error at axios request ,"+error);
});
}
export default multipaperrequest;