const db = require('../database/models');
const { Op } = require("sequelize");
const { sequelize } = require('../database/models');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const userController = {
  processRegister: (req, res) =>{
    let errors = validationResult(req);
    if(errors.isEmpty()){
      db.User.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10)
      })
        .then(a => res.status(200).json(a))
    }else{
      res.status(200).json({errors: errors.mapped(), old: req.body})
    }
  },
  processLogin: (req, res) =>{
    db.User.findOne({
      where: {[Op.and]: [{email: req.body.email}]}
    })
    .then(data =>{
      let pass = req.body.password;
      let passHash = data.dataValues.password
      let check = bcrypt.compareSync(pass, passHash);
      if(data && check){
        req.session.user = data.dataValues;
        res.status(200).json(data)
        console.log(req.session.user);
      }else{
        res.status(200).json({msg: 'La contraseña y/o el email es incorrecto'})
      }
    })
  },
  sendSession: (req, res) =>{
    res.status(200).json(req.session.user)
  }
}
module.exports = userController;