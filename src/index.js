const express = require("express");
const {uuid, isUuid} = require("uuidv4");

const app = express();

app.use(express.json())


const scraps = [];

//middleware que verifica o tempo.
function logTime(request, response, next){
  console.time("Request time: ");
  next();
}

//middleware que verifica o UuID.
function verifyUuID(request, response, next) {
  const { id } = request.params;

  if(isUuid(id)){
    next();
  } else {
    return response.status(400).json({error:"Invalid UuID"});
  }
}

//middleware que verifica se o Scrap possui título e mensagem.
function verifyScrap(request, response, next){
  const { title, message} = request.body;

  if((title || message) === ""){
    return response.status(400).json({error:"All scrap fields must be filled!"})
  } else {
    next();
  }
}

app.use('/scraps', logTime);
app.use('/scraps/:id', verifyUuID);
app.use('/scraps', verifyScrap);

app.get('/scraps',(request, response) => {
    const { scrapTitle } = request.query;
    let filtered = "";

      console.timeEnd("Request time: ");
      return response.json(scraps);  
})

//create
app.post('/scraps', (request, response) => {
    const {title, message} = request.body;

    const scrap = {id: uuid(),title, message};

    scraps.push(scrap);

    console.timeEnd("Request time: ");
    return response.json(scrap);
});

//edit
app.put(`/scraps/:id`, (request, response) => {
  const { id } = request.params;
  const {title, message} = request.body;
  const scrapsIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapsIndex < 0) {
    return response.status(400).json({ error: " Project not found" });
  }
  const scrap = {
    id,
    title,
    message,
  };
  scraps[scrapsIndex] = scrap;
  console.timeEnd("Request time: ");
  return response.json(scrap);
});

//delete
app.delete('/scraps/:id', (request, response) => {
  const { id } = request.params;
  const scrapIndex = scraps.findIndex(scrap => scrap.id == id);
  
  if(scrapIndex < 0) {
      return response.status(400).json({error: "Scrap not found"});
  }

  scraps.splice(scrapIndex, 1);

  console.timeEnd("Request time: ");
  return response.status(204).send();
})


const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});
