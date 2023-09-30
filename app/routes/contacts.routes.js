const express = require("express");
const {
  findAll,
  create,
  findAllFavorite,
  findOne,
  update,
  deleteContact,
  deleteAllContacts,
} = require("../controllers/contacts.controller");

const router = express.Router();

router.route("/").get(findAll).post(create).delete(deleteAllContacts);

router.route("/favorite").get(findAllFavorite);

router.route("/:id").get(findOne).put(update).delete(deleteContact);

module.exports = router;
