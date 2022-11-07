import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  users.push(req.body);

  res.status(201).send("OK");
  console.log(users);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const findUser = users.find((i) => i.username === username);

  if (!findUser) {
    res.status(400).send("Usuário não cadastrado");
    return;
  }
  const newTweet = {
    username,
    avatar: findUser.avatar,
    tweet,
  };

  tweets.push(newTweet);
  res.status(201).send("OK");
  console.log(tweets);
});

app.get("/tweets", (req, res) => {
  res.send(tweets.filter((t, i) => i >= tweets.length - 10));
});

app.listen(5000, () => {
  console.log("App running in port: 5000");
});
