const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())
const PDFDocument = require('pdfkit');
const request = require('request'); 
const pdf = require('html-pdf');
const pdfTemplate = require('./createPdf')
const path = require('path')
const officegen = require('officegen')
const fs = require('fs')
let docx = officegen('docx')
let bulletPoints = ""
let obj = {}

function objToString (obj) {
  let str = '';
  for (const [p, val] of Object.entries(obj)) {
      str += `${p}:${val}\n`;
  }
  return str;
}






app.get('/',async(req,res)=>{
  res.send("Dsadsad")
  let pObj = docx.createP()
  pObj.addText(`${bulletPoints}`)
  let out = fs.createWriteStream('info.docx')
  docx.generate(out)
  setTimeout(() => {
    res.sendFile(path.join(__dirname, 'info.docx'), function (err) {
      if (err) {
        console.error(err);
      } else {
        docx = officegen('docx');
        console.log('info.docx file has been cleared');
      }
    });
  }, 2000);
  console.log(bulletPoints)
});

app.get('/fetchPdf',(req,res)=>{
  res.sendFile(path.join(__dirname, 'info.pdf'))
});

app.post('/',(req,res)=>{
     obj = req.body
  const options = {
    method: 'POST',
    url: 'https://api.textrazor.com/',
    headers: {
      'x-textrazor-key': '783aa297c80dc07f9af11e4379343550173e11b84a1d6516fc1b4d56',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      extractors: 'entities,entailments,topics,relations,words,phrases',
      text: objToString(obj)
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

      bulletPoints = JSON.parse(body).response.sentences.map(sentence => `- ${sentence.words.map(word => word.token).join(' ')}`).join('\n');
      console.log(bulletPoints)
  });
})


app.post('/download',(req,res)=>{
  pdf.create(pdfTemplate(bulletPoints),{}).toFile('info.pdf',(err)=>{
    if(err){
        console.log(err);
    }
    res.send('pdf generated')
  })
})









app.listen(3001,()=>console.log("server is running"))

