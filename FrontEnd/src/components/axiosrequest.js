import axios from "axios";  
var FormData = require('form-data');
const  multipaperrequest=(files)=>{
    var data = new FormData();
    for (var i=0; i<files.length; i++){
        data.append("files", files[i],{
            contentType: "application/pdf",
        });
    }
    console.log(...data);

var config = {
  method: 'post',
  url: 'https://eee6-157-39-225-189.ngrok.io/multiplepapertopics',
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'multipart/form-data',
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log("error at axios request ,"+error);
});
}
export default multipaperrequest;