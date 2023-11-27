const { Router } = require("express")

const userController = require("../controllers/movieController")

const router = Router()

router.route("/")
    .get(userController.getAllMovies)

module.exports = router