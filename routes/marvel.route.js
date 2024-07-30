import { deleteCharacter, getCharacters, getSingleCharacter, saveCharacter, updateCharacter } from "../controllers/marvel.controller";

module.exports = function (app, express) {

    // Packages
    const router = express.Router();

    router.get('/characters', getCharacters);
    router.get('/single-character', getSingleCharacter);

    router.post('/save-character', saveCharacter);

    router.put('/update-character', updateCharacter);

    router.delete('/delete-character', deleteCharacter)

    app.use('/', router);

}