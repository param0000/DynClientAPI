const router = require('express').Router();
const Dyn = require('./DynProc')
const common = require('./common')
const clientSql = require('./../dbConfigs');

router.route('/:token/db/:sp').get((req,res) => {
    common.createConnectionForClient(req.params.token).then(res1 => {
        var data = res1[0]
        res.send(Dyn(clientSql.ClientDB(data.dbHost,data.userName,data.password,data.dbPort,data.db),req,res))
    }).catch(err => {res.send(err)})
})

// router.route('/Verify/:Token').get((req,res) => {
//     console.log(req.params.Token)
//     res.send(common.userVerify(req.params.Token))
// })

// router.route('/encrypt/:data').get((req,res) => {
//     res.send(common.security(req.params.data,'',1))
// })

// router.route('/saveJSON/:token').get((req,res) => {
//     console.log(req.params.token)
// })


module.exports = router