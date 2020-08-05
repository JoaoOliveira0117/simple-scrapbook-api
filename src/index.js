const express = require("express");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json())

const scraps = [];


//create

app.post('/scraps', (request, response) => {
    const {scrapTitle, scrapBody} = request.body;

    const scrap = {scrapTitle, scrapBody};

    scraps.push(scrap);

    return response.json(scrap);
});

//edit

//delete

const port = 3333;
app.listen(port, () => {
  console.log(`👌 Server up and running on PORT ${port}`);
});
