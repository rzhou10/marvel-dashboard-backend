
const getCharacters = (req, res) => {
    try {
        //
    } catch (e) {
        console.warn(e);
        return res.status(500).json({message: "An error occurred with getting the characters"})
    }
}

const getSingleCharacter = (req, res) => {
    try {
        //
    } catch (e) {
        console.warn(e);
        return res.status(500).json({message: `An error occurred with getting the character with the id of ${req.params.id}`})
    }
}

const saveCharacter = (req, res) => {}

const updateCharacter = (req, res) => {}

const deleteCharacter = (req, res) => {}

module.exports = {
    getCharacters, getSingleCharacter, saveCharacter,
    updateCharacter, deleteCharacter
}