'use strict';

module.exports = function (c) {
  return {
    index: function (req, res) {
      var data = [];
      c.query('SELECT * from projects;')
        .on('result', function (result) {
          result.on('row', function (row) {
            data.push(row);
          })
          .on('error', function (err) {
            console.log(err);
          })
        })
        .on('end', function () {
          res.json(data);
        })
    },

    show: function (req, res) {
      c.query('SELECT * from projects where projectId =' + req.params.id)
        .on('result', function (result) {
          result.on('row', function (row) {
            res.json(row);
          })
          .on('error', function (err) {
            console.log(err);
          })
        })
        .on('end', function () {
          console.log('Found a requested data successfully');
        })
    },

    create: function (req, res) {
      var params = req.body;
      c.query('INSERT INTO projects (title, desc, orgId) VALUES (:title, :desc, :orgId)',
        {title: params.title, desc: params.desc, orgId: params.orgId})
        .on('result', function (result) {
          result.on('row', function (row) {
            console.log(row);
          })
          .on('error', function (err) {
            console.log(err);
          })
        })
        .on('end', function () {
          console.log('create a new project successfully!');
        })
    }
  }
}