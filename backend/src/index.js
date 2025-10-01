const app = require("./app");

const PORT = 3001;

app.listen(PORT, () =>{
    console.log("ServidorCorriendo en X lugar http://localhost:?", [PORT]);
});