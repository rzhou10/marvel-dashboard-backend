import { getCharacters, getSingleCharacter, saveCharacter, updateCharacter, deleteCharacter } from '../controllers/marvel.controller.js';

export default function routes (app, express) {

    // Packages
    const router = express.Router();

    router.get('/characters', getCharacters);
    router.get('/single-character', getSingleCharacter);

    router.post('/save-character', saveCharacter);

    router.put('/update-character', updateCharacter);

    router.delete('/delete-character', deleteCharacter)

    app.use('/', router);

}