const {Router} = require('express');
const { userGet, userPost, userDelete, userPatch } = require('../controllers/users.controller');

const router= Router();

router.get('/',userGet)

  router.post('/', userPost);

  router.delete('/:id',userDelete );

  router.patch('/', userPatch);

  module.exports=router