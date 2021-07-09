const {response,request}= require('express');

const userGet=( (req, res=response)=> {

    res.json({
        method:'Get-controlador'})
  });
const userPost =((req=request,res=response)=>{

    const {nombrem, edad1, noenviado=true}= req.query

    const {nombre='no enviado', edad}=req.body;
res.json({
    method:'POST-controller',
    nombrem,
    edad1,
    noenviado,
    nombre
});

})

const userDelete =((req=request,res=response)=>{
    const {id}=req.params
    res.json({
        method:'Delete controller',
        id
    })
    });


    const userPatch=((req,res=response)=>{
        res.json({
            method:'PATCH controller'
        })
    })
module.exports={
    userGet,
    userPost,
    userDelete,
    userPatch
}