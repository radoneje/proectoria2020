var express = require('express');
var router = express.Router();
const fsP= require("fs").promises;
const fs= require("fs");


 function adminAuth(req, res, next) {
   const auth = {login: 'editor', password: 'dfczgegrby'} // change this

   // parse login and password from headers
   const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
   const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

   // Verify login and password are set and correct
   if (login && password && login === auth.login && password === auth.password) {
     // Access granted...
     return next()
   }

   // Access denied...
   res.set('WWW-Authenticate', 'Basic realm="401"') // change this
   res.status(401).send('Authentication required.') // custom message
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'proektforum', status: JSON.stringify(await videoStatus()) });
});

router.get('/admin',adminAuth, async function(req, res, next) {
  let json={selected1:0, selected2:0};
  if (fs.existsSync('player.json')){
    try {
      let j = await fsP.readFile("player.json");
      json = JSON.parse(j)
    } catch (e) {
      console.warn(e)
    }
  }
  res.render('admin', { title: 'admin', dt:JSON.stringify(json) });
});
router.post("/setJson", async (req, res)=>{
  await fsP.writeFile("player.json", JSON.stringify( req.body));
  res.json(1)
})
router.get("/getJson", async (req, res)=>{

  res.json(await videoStatus());
})
async function videoStatus(){
  let json={selected1:0, selected2:0};
  if (fs.existsSync('player.json')){
    try {
      let j = await fsP.readFile("player.json");
      json = JSON.parse(j)
    } catch (e) {
      console.warn(e)
    }
  }
  var ret={};
  if(json.selected1==0){
    ret.player11='<img class="zatichka" src="/images/009_ya22_trnsl_001.jpg"></img>'
    ret.player21='<img class="zatichka" src="/images/009_ya22_trnsl_001.jpg"></img>'
  }
  if(json.selected2==0){
    ret.player12='<img class="zatichka" src="/images/009_ya22_trnsl_001.jpg"></img>'
    ret.player22='<img class="zatichka" src="/images/009_ya22_trnsl_001.jpg"></img>'
  }

  if(json.selected1==1){
    ret.player11=json.txt11
    ret.player21=json.txt21
  }
  if(json.selected2==1){
    ret.player12=json.txt12
    ret.player22=json.txt22
  }

  if(json.selected1==3){
    ret.player11=json.txt31
    ret.player21=json.txt31
  }
  if(json.selected2==3){
    ret.player12=json.txt32
    ret.player22=json.txt32
  }
  ret.selected1=json.selected1;
  ret.selected2=json.selected2;

  return  ret;

}

module.exports = router;
