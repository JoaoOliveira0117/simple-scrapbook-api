const express = require("express");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json())

const scraps = [];

app.get('/scraps',(request, response) => {
    return response.json(scraps);
})

//create
app.post('/scraps', (request, response) => {
    const {scrapTitle, scrapBody} = request.body;

    const scrap = {id: uuid(),scrapTitle, scrapBody};

    scraps.push(scrap);

    return response.json(scrap);
});

//edit
app.put(`/scraps/:id`, (request, response) => {
  const { id } = request.params;
  const { scrapTitle, scrapBody } = request.body;

  const scrapsIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapsIndex < 0) {
    return response.status(400).json({ error: " Project not found" });
  }
  const scrap = {
    id,
    scrapTitle,
    scrapBody,
  };
  scraps[scrapsIndex] = scrap;
  return response.json(scrap);
});

//delete
app.delete('/scraps/:id', (request, response) => {

    const { id } = request.params;
    const { scrapTitle, scrapBody } = request.params;
    const scrapIndex = scraps.findIndex(scrap => scrap.id == id);
    
    if(scrapIndex < 0) {
        return response.status(400).json({error: "Scrap not found"});
    }

    scraps.splice(scrapIndex, 1);

    return response.status(204).send();
})


const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});
