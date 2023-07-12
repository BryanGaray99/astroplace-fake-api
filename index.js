const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(jsonServer.bodyParser);
server.use(cors());
server.use(middlewares);

// Custom endpoint for adding visitors
server.post("/visitors", (req, res) => {
  const { name } = req.body;

  if (name) {
    const db = router.db;
    const visitor = { name };
    db.get("visitors").push(visitor).write();
    res.status(201).json(visitor);
  } else {
    res.status(400).json({ error: "Name is required" });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
