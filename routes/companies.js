const express = require("express")
const router = new express.Router();
const ExpressError = require("express-error")


// app.use(function(req, res, next) {
//     const err = new ExpressError("Not Found", 404);
//     return next(err);
//   });

// seeing specific company and the industries they belong to
router.get("/:code", async function (req, res, next) {
try { const results = await db.query(`SELECT code, name, i.industry  from companies c WHERE code=$1 join typeOfCompany tc on c.name= tc.company join industry i on tc.industry=i.industry`, [code])
return res.json({"companies": results.rows});
}
catch (err){
    return next(err)
}
})
//get list of companies
router.get("/", async function (req, res, next) {
    try { const results = await db.query(`SELECT code, name from companies`)
    return res.json({"companies": results.rows});
    }
    catch (err){
        return next(err)
    }
    })

// get a company by code/id
router.get("/:code", async function (req, res, next) {
    const { code } = req.params
    try { const results = await db.query(`SELECT code, name, description from companies WHERE code=$1`, [code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such id", 404)};
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }}
    )

// insert a record into companies
router.post("/", async function (req, res, next) {
    const { code, name, description } = req.body
    try { const results = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code, name, description])
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })

// patch update a record
router.put("/:code", async function (req, res, next) {
    const { code, name, description } = req.body
    try { const results = await db.query(`UPDATE companies SET name=$1, description=$2 WHERE code = $3 RETURNING *`, [name, description, code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such id", 404)};
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })

// delete an entry
router.delete("/:code", async function (req, res, next) {
    const { code } = req.params
    try { const results = await db.query(`DELETE from companies WHERE id = $1 RETURNING *`, [code])
    if (results.rows.length === 0) {
        throw new ExpressError("No such id", 404)};
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })

// adding an industry
router.post("/industry", async function (req, res, next) {

    try { const results = await db.query(`INSERT INTO industry (code, industry) VALUES ($1, $2) RETURNING *`, [code, industry])
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }
    })

//listing all inutries with company code for that industry
router.get("/industry", async function (req, res, next){
    try { const results = await db.query(`SELECT i.industry, c.code from industry i join typeOfCompany tc on i.industry= tc.industry join company c on c.name=tc.company`, [code, industry])
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }



})

//associating industry to company
router.get('industry/company', async function(req, res, next){
    try { const results = await db.query(`SELECT i.industry, c.name from INDUSTRY join typeOfCompany tc on tc.indutry= i.industry join company c on c.name=tc.company`)
    return res.json(results.rows);
    }
    catch (err){ console.log('error 404')
        return next(err)
    }


})
module.exports = router