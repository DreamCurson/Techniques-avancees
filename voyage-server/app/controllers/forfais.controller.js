const db = require("../models");
const Forfais = db.forfais;

exports.findAll = (req, res) => {
  Forfais.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erreur lors de la recherche des forfais",
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Le nom est obligatoire",
    });
    return;
  }
  Forfais.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible d'enregistrer le forfais",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Forfais.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur c'est produite avec la base de données",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Forfais.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Votre forfais est mis à jour",
        });
      } else {
        res.send({
          message: "Votre forfais est introuvable",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur c'est produite avec la base de données",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Forfais.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Votre forfais à été supprimé",
        });
      } else {
        res.send({
          message: "Votre forfais est introuvable",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur c'est produite avec la base de données",
      });
    });
};
