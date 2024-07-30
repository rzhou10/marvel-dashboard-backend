
const getCharacters = (req, res) => {
    try {

        return res.send(200).json({})
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ message: "An error occurred with getting the characters" })
    }
}

const getSingleCharacter = (req, res) => {
    try {
        const query = `select
	marvel.Character.name as charName, marvel.Character.description as charDescription, marvel.Character.team, marvel.Character.powers_abilities,
    Comics.title as comicTitle, Comics.\`issue-no\` as issueNo, Comics.description as comicDescription, Comics.pages, Comics.cover as comicsCoverArt, Comics.upc, Comics.diamond_code,
    Creators.name as creatorName, Creators.role as creatorRole,
	Events.title as eventTitle, Events.description as eventDescription, Events.image as eventImage, Events.start_date as eventStartDate, Events.end_date as eventEndDate,
    Series.title as seriesTitle, Series.description as seriesDescription, Series.start_year as startYear, Series.end_year as endYear, Series.image as seriesImage,
     Stories.title as storyTitle, Stories.image as storyImage
from marvel.Character
inner join Comics on Comics.marvel_comics_id = marvel.Character.marvel_comics_id
inner join Series on Comics.marvel_series_id = Series.marvel_series_id
inner join Creators on Comics.marvel_creator_id = Creators.marvel_creator_id
inner join marvel.Events on Comics.marvel_event_id = marvel.Events.marvel_event_id
inner join Stories on Comics.marvel_story_id = Stories.marvel_story_id
where marvel.Character.marvel_character_id = ${req.body.characterId};`;

        return res.status(200).json({})
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ message: `An error occurred with getting the character with the id of ${req.params.id}` })
    }
}

const saveCharacter = (req, res) => {
    try {
        // fetch information from marvel APIs to get additional information so we can get a complete overview
        const characterQuery = `insert into marvel.Character
            (marvel.Character.marvel_character_id, marvel.Character.name, marvel.Character.description, marvel.Character.team, marvel.Character.powers_abilities, marvel.Character.marvel_comics_id)
            values (${req.body.characterId}, ${req.body.name}, ${req.body.description}, description);`

        const comicsQuery = ``;
        const SeriesQuery = ``;
        const creatorsQuery = ``;
        const eventsQuery = ``;
        const storiesQuery = ``;
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ message: `An error occurred with getting the character with the id of ${req.params.id}` })
    }
}

const updateCharacter = (req, res) => {
    try {
        return res.send(200).json({ message: "Successfully updated character!" })
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ message: "An error occurred with getting the characters" })
    }
}

const deleteCharacter = (req, res) => {
    try {
        return res.send(200).json({ message: "Successfully delete character!" })
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ message: "An error occurred with getting the characters" })
    }
}

module.exports = {
    getCharacters, getSingleCharacter, saveCharacter,
    updateCharacter, deleteCharacter
}