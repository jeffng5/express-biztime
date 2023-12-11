const express = require("express")
const router = new express.Router();

router.get("/", async function (req, res, next) {
try { const results = await db.query(`SELECT * from companies`)
return res.json(results.rows);
}
catch (err){
    return next(err)
}
})

router.get("/:code", async function (req, res, next) {
    const { code } = req.body
    try { const results = await db.query(`SELECT code, name, description from companies WHERE code=$1`, [code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404);
    return res.json(results.rows);
    }}
    catch (err){ console.log('error 404')
        return next(err)
    }}
    )

router.post("/", async function (req, res, next) {
    const { code, name, description } = req.body
    try { const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code, name, description])
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })


router.put("/:code", async function (req, res, next) {
    const { code, name, description } = req.body
    try { const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code = $3 RETURNING *`, [name, description, code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)};
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })


router.delete("/:code", async function (req, res, next) {
    const { code } = req.body
    try { const results = await db.query(`DELETE from companies WHERE id = $1 RETURNING *`, [code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such message", 404)};
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })
module.exports = router