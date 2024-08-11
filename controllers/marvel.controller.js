import axios from "axios";
import { mySqlConnection } from "../global/global";

/**********************************************
  Fetches all Characters through pagination
  req.body = {
    page: page number (int)
    limit: how many characters to fetch (int)
  }
***********************************************/
export const getCharacters = async (req, res) => {
  try {
    const pageNo = req.body.page;
    const limit = req.body.limit
    const query = `select marvel.Character.marvel_character_id as id, marvel.Character.name as charName, marvel.Character.image from marvel.Character
        LIMIT ${limit} OFFSET ${pageNo}`;

    const results = await mySqlConnection(query);

    return res.status(200).json(results)
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: "An error occurred with getting the characters" })
  }
}

/******************************************************
  Fetches a specific character
  req.body = {
    characterId: id for the requested character (int)
  }
*******************************************************/
export const getSingleCharacter = async (req, res) => {
  try {
    const query = `select
            marvel.Character.name as charName, marvel.Character.description as charDescription, marvel.Character.team, marvel.Character.powers_abilities,
            Comics.title as comicTitle, Comics.\`issue-no\` as issueNo, Comics.description as comicDescription, Comics.pages, Comics.cover as comicsCoverArt, Comics.upc, Comics.diamond_code,
            Creators.name as creatorName, Creators.role as creatorRole,
            Events.title as eventTitle, Events.description as eventDescription, Events.image as eventImage, Events.start_date as eventStartDate, Events.end_date as eventEndDate
        from marvel.Character
        inner join Comics on Comics.marvel_comics_id = marvel.Character.marvel_comics_id
        inner join Series on Comics.marvel_series_id = Series.marvel_series_id
        inner join Creators on Comics.marvel_creator_id = Creators.marvel_creator_id
        where marvel.Character.marvel_character_id = ${req.body.characterId};`;

    const results = await mySqlConnection(query);

    return res.status(200).json({})
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: `An error occurred with getting the character with the id of ${req.params.id}` })
  }
}

/******************************************************
  Saves character to the database
  req.body = {
    characterId: id for the requested character (int)
  }
*******************************************************/
export const saveCharacter = async (req, res) => {
  try {
    const characterId = req.body.characterId;
    // fetch information from marvel APIs to get additional information so we can get a complete overview
    const comicsRes = await axios.post(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${PUBLIC_KEY}`);
    const creatorsRes = await axios.post(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/events?apikey=${PUBLIC_KEY}`);

    const characterQuery = `insert into marvel.Character
            (marvel.Character.marvel_character_id, marvel.Character.name, marvel.Character.image, marvel.Character.description, marvel.Character.team, marvel.Character.powers_abilities)
            values (${characterId}, ${req.body.name}, ${req.body.image}, ${req.body.description}, '', '', '');`
    // upsert in case the values already exist
    const comicsQuery = ``;
    const creatorsQuery = ``;

    const results = await mySqlConnection(characterQuery);
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: `An error occurred with getting the character with the id of ${req.params.id}` })
  }
}

/******************************************************
  Updates character with new information
  req.body = {
    characterId: id for the requested character (int)
  }
*******************************************************/
export const updateCharacter = async (req, res) => {
  try {
    const characterId = req.body.characterId;
    const updateQuery = `update marvel.Character
      set 
      where marvel.Character.marvel_character_id = ${characterIds}`;
    return res.status(200).json({ message: "Successfully updated character!" });
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: "An error occurred with updating the character with the id of ${req.params.id}" })
  }
}

/******************************************************
  Deletes character from the database
  req.body = {
    characterId: id for the requested character (int)
  }
*******************************************************/
export const deleteCharacter = async (req, res) => {
  try {
    // delete all references in every table in MySQL
    const characterId = req.body.characterId;
  
    const characterQuery = `delete from marvel.Character where marvel.Character.marvel_character_id = ${characterId}`;
    const comicsQuery = `delete from marvel.Character_Teams where marvel.Character_Teams.marvel_character_id = ${characterId}`;
  
    // delete from junction tables as well
    const characterTeamsQuery = `delete from marvel.Character_Teams where marvel.Character_Teams.marvel_character_id = ${characterId}`;
    const characterComicsQuery = `delete from marvel.Character_Comics where marvel.Character_Comics.marvel_character_id = ${characterId}`;
  
    const charResults = await mySqlConnection(characterQuery);
  
    const comicsResults = await mySqlConnection(comicsQuery);
    const characterTeamsResults = await mySqlConnection(characterTeamsQuery);
    const characterComicsResults = await mySqlConnection(characterComicsQuery);
    return res.status(200).json({ message: "Successfully delete character!" })
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: "An error occurred with deleting the characterwith the id of ${req.params.id}" })
  }
}