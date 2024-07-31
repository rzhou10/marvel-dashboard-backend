const character = require('../controllers/marvel.controller');


module.exports = function (app, express) {

    // Packages
    const router = express.Router();

    router.get('/characters', character.getCharacters);
    router.get('/single-character', character.getSingleCharacter);

    router.post('/save-character', character.saveCharacter);

    router.put('/update-character', character.updateCharacter);

    router.delete('/delete-character', character.deleteCharacter)

    app.use('/', router);

}