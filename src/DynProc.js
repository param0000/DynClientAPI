
function Dyn(dbConfig,req,res) {
    const sp = req.params
    const param = req.body
    const key = Object.keys(param)
    let finalQuery = `call ${sp.sp}`
    if (key.length > 0) {
        dbConfig.query(`select parameter_name as parameter, data_type as type from information_schema.parameters where SPECIFIC_NAME = "${sp.sp}"`, function (err, result) {
            if (err) {
                res.send(err);
            } else if (result) {
                // console.log(result)
                let quotedType = ['varchar', 'nvarchar', 'blob', 'char', 'binary', 'varbinary', 'text', 'enum', 'set', 'tinyblob', 'mediumblob', 'longtext']
                let numType = ['int', 'tinyint', 'smallint', 'mediumint', 'bigint', 'bit', 'boolean']
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        // console.log(param[result[i].parameter])
                        if (i == 0) {
                            finalQuery = finalQuery + `(`
                        }
                        if (i <= (result.length - 2)) {
                            if (result[i].type == 'json') {
                                finalQuery = finalQuery + `'${JSON.stringify(param[result[i].parameter])}', `
                            } else if (quotedType.includes(result[i].type)) {
                                finalQuery = finalQuery + `'${param[result[i].parameter]}', `
                            } else if (numType.includes(result[i].type)) {
                                finalQuery = finalQuery + `${param[result[i].parameter]}, `
                            }
                        }

                        if (i == result.length - 1) {
                            // console.log(`${param[result[i].parameter].Name}`)
                            if (result[i].type == 'json') {
                                finalQuery = finalQuery + `'${JSON.stringify(param[result[i].parameter])}', `
                            } else if (quotedType.includes(result[i].type)) {
                                finalQuery = finalQuery + `'${param[result[i].parameter]}'`
                            } else if (numType.includes(result[i].type)) {
                                finalQuery = finalQuery + `${param[result[i].parameter]}`
                            }
                            finalQuery = finalQuery + `);`
                        }
                    }
                    dbConfig.query(finalQuery, function (err, result) {
                        if (err) { res.send(err); }
                        res.send(result)
                    })
                } else {
                    res.send(`Please Fill Valid Procedure Names`)
                }
            }
        })
    } else {
        finalQuery = finalQuery + `();`
        dbConfig.query(finalQuery, function (err, result) {
            if (err) { res.send(err); }else{
                res.send(result)
            }
        })
    }
}

module.exports = Dyn