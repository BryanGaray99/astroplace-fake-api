const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
server.post("/visitors", (req, res) => {
    const { name } = req.body;
  
    if (name) {
      const visitor = { name };
      const db = router.db;
      db.get("visitors").push(visitor).write();
      res.status(201).json(visitor);
    } else {
      res.status(400).json({ error: "Name is required" });
    }
});
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

server.use(middlewares);
server.use(router);

server.listen(port);