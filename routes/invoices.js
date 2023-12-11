const express = require("express")
const router = new express.Router();

router.get("/", async function(req,res,next){
    try {const results = await db.query(`SELECT * FROM invoices`)
        return res.json(results.rows);
}
catch (err){
    return next(err)
}

})

router.get("/:id", async function(req,res,next){
    const { id } = req.params
    try {const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)}
    return res.json(results.rows);
    
}
    catch(err) { console.log('error 404')
        return next(err)
    }

})

router.post("/", async function(req,res,next){
    const { comp_code, amt } = req.body
    try {const results = await db.query(`INSERT INTO invoices (comp_code, amt) VALUES ($1, $2)
    RETURNING *`, [comp_code, amt])
    return res.json(results.rows);
}
    catch (err){ console.log('error 404')
    return next(err)
}

})

router.put("/:id", async function(req,res,next){
    const { amt } = req.body
    const { id } = req.params
    try {const results = await db.query(`UPDATE invoices SET amt=$1 WHERE code = $2 RETURNING *`,
    [amt, id])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)};
    return res.json(results.rows);
}
catch (err){ console.log('error 404')
        return next(err)
}

})

router.delete("/:id", async function(req,res,next){
    const {id} = req.params
    try {const results = await db.query(`DELETE from invoices WHERE id = $1 RETURNING *`, [id] )
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)};
    return res.json(results.rows);
    }
    catch(err){console.log('error 404')
        return next(err)
}
})

router.put("/:id", async function(req,res,next){
    const { amt, paid, paid_date } = req.body
    const { id } = req.params
    try {const results = await db.query(`UPDATE invoices SET amt=$1 paid=$3 WHERE code = $2 RETURNING *`,
    [amt, id, paid])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)}
    
    if (paid_date.length === 0){
        paid_date == CURRENT_DATE
    }
    if (paid < 0) {
        paid_date == null
    }
    else {
        paid_date == paid_date
    }
    
    try {const results2 = await db.query(`SELECT * from invoices`)
    return res.json(results2.rows);}
    catch (err){ console.log('error 404')
        return next(err)
}} catch (err){
    return next(err)}} )

module.exports = router
