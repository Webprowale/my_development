import express from "express";
import { query, validationResult, body, matchedData } from "express-validator";
const app = express();

app.use(express.json());

// middlewares

const loggedingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};
const resolveIndexUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const passId = parseInt(id);
  if (isNaN(passId)) return res.sendStatus(400);
  const findUserId = mockUsers.findIndex((user) => user.id === passId);
  if (findUserId === -1) return res.sendStatus(404);
  req.findUserId = findUserId;
  req.passId = passId;
  next();
};
//global use
// app.use(loggedingMiddleware);

const PORT = process.env.PORT || 3000;
const mockUsers = [
  {
    id: 1,
    and: "jesus",
    des: "fuuuk",
  },
  {
    id: 2,
    and: "james",
    des: "hjklj",
  },
  {
    id: 3,
    and: "joshua",
    des: "ghnsm",
  },
];
app.get(
  "/",
  (req, res, next) => {
    console.log("base url");
    next();
  },
  (req, res, next) => {
    console.log("request method");
    next();
  },
  (req, res) => {
    res.status(201).send("i love jesus");
  }
);

app.get("/api/users", query("filter").isString().notEmpty(), (req, res) => {
  // Query Params ? sort=asc
  const result = validationResult(req);
  console.log(result);
  const {
    query: { filter, value },
  } = req;
  if (!filter && value) return res.send(mockUsers);
  "".includes();
  if (filter && value)
    res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.status(200).send(mockUsers);
});

app.get("/api/products", (req, res) => {
  res.send([
    {
      id: 23,
      username: "jesus",
      price: 400,
    },
  ]);
});
// Params explain
app.get("/api/users/:id", (req, res) => {
  const passId = parseInt(req.params.id);
  console.log(passId);
  if (isNaN(passId))
    return res.status(400).send({
      msg: "invalid Id",
    });
  const findUser = mockUsers.find((user) => user.id === passId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

//post request
app.post(
  "/api/users",
  body("and").notEmpty().isLength({ min: 5, max: 20 }),
  body('des').notEmpty().isString(),
  (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
      return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    console.log(data);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  }
);

//PUT-> it update entire field of record

app.put("/api/users/:id", resolveIndexUserId, (req, res) => {
  const { body, findUserId, passId } = req;
  //    const passId = parseInt(id)
  //    if(isNaN(passId)) return res.sendStatus(400);
  //    const findUserId = mockUsers.findIndex((user)=> user.id === passId
  //    );
  //    if(findUserId === -1) return res.sendStatus(404);
  mockUsers[findUserId] = { id: passId, ...body };
  return res.send(mockUsers[findUserId]);
});

//PATCH-> it update a port of field of record
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const passId = parseInt(id);
  if (isNaN(passId)) return res.sendStatus(400);
  const findUserId = mockUsers.findIndex((user) => user.id === passId);
  if (findUserId === -1) return res.sendStatus(404);
  mockUsers[findUserId] = { ...mockUsers[findUserId], ...body };
  return res.send(mockUsers[findUserId]);
});

// Delete
app.delete("/api/users/:id", resolveIndexUserId, (req, res) => {
  const { findUserId } = req;
  //  const { params:{ id } } = req;
  //  const passId = parseInt(id);
  //  if(isNaN(passId)) return res.sendStatus(400);
  //  const findUserId = mockUsers.findIndex((user)=> user.id === passId);
  //  if(findUserId === -1 ) return res.sendStatus(404);
  mockUsers.splice(findUserId, 1);
  return res.sendStatus(200);
});

//validation for express

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
