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
    return res.json(results.rows);
}
catch (err){ console.log('error 404')
        return next(err)
}

})

router.delete("/:id", async function(req,res,next){
    const {id} = req.params
    try {const results = await db.query(`DELETE from invoices WHERE id = $1 RETURNING *`, [id] )
    return res.json(results.rows);
    }
    catch(err){console.log('error 404')
        return next(err)
}
})

module.exports = router
