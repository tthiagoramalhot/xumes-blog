const express = require('express')
const router = express.Router()
const ibmdb = require('ibm_db')

router.get('/postagens', (req, res) => { 

    ibmdb.open('DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=jpg75427;PWD=vdmbq2-xd0fq32vh;PORT=50000;PROTOCOL=TCPIP', (err, conn) =>{
        if(err){
            return console.log(err)
        }
        
        conn.query("select * from JPG75427.POSTAGENS", (err, data) =>{
            if(err){
                console.log({erro: err})
            }else{
                console.log({data: data})
                res.send(data)
            }
        })

        conn.close(() =>{
            console.log('conexão encerrada')
        })
    })
})

router.get('/postagens/nova', (req, res) =>{
    ibmdb.open('DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=jpg75427;PWD=vdmbq2-xd0fq32vh;PORT=50000;PROTOCOL=TCPIP', (err, conn) => {
        if(err){
            return console.log({erro: err, mensagem: 'conexão falhou'})
        }

        conn.query('INSERT INTO JPG75427.POSTAGENS VALUES ($' + req.query.titulo + ', $' + req.query.conteudo + ', $' + req.query.autor + ')', (err, data) => {
            if(err){
                console.log({erro: err, mensagem: 'insert falhou...'})
            }else{
                console.log(data)
                res.send(data)
            }

            conn.close(() =>{
                console.log('conxao encerrada...')
            })
        })
    })
})

module.exports = router