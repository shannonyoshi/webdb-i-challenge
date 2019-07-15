const express = require("express");
const knex = require("knex");
const db = require("./dbConfig");

const dbConnection = knex({
  client: "sqlite3",
  connection: { filename: "./data/budget.db3" },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  dbConnection("accounts")
    .insert(post, "id")
    .then(arrayOfIds => {
      const idOfLstRecordInserted = arrayOfIds[0];
      res.status(201).json(idOfLstRecordInserted);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count === 1) {
        res.status(200).json({ message: "One record was updated" });
      } else if (count > 1) {
        res.status(200).json({ message: `${count} records were updated` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  dbConnection("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
