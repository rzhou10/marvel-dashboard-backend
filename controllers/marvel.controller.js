import axios from "axios";
import { mySqlConnection } from "../global/global.js";

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
  req.body = [{
    characterId: id for the requested character (int)
    name: name for the requested character (string)
    image: image url for the requested character (string)
    description: image url for the requested character (string)
  }]
  res = message based on result of database query
*******************************************************/
export const saveCharacter = async (req, res) => {
  try {
    const characters = req.body;

    // fetch information from marvel APIs to get additional information so we can get a complete overview
    const axiosCallsComics = [];
    const charIds = [];

    characters.forEach(async ch => {
      const characterId = ch.id;
      axiosCallsComics.push(await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?format=comic&apikey=${process.env.PUBLIC_KEY}`));
      charIds.push(characterId);
    });

    const comicsRes = await Promise.all(axiosCallsComics);

    if (comicsRes.some(cr => cr.code !== 200)) {
      return res.status(500).json({ message: `An error occurred with fetching comics` });
    }

    // create all values needed to insert into MySQL
    const characterValues = characters.map((ch) => `('${ch.id}', '${ch.name}', '${ch.image}', '${ch.description}', '', '')`).join(', ')
    let comicsValues = [];
    let creatorValues = [];
    let characterComicJunctionValues = [];
    let comicsCreatorJunctionValues = [];

    comicsRes.data.results.forEach((cr) => {
      // values for comics table
      comicsValues.push(`('${cr.id}', '${cr.digitalId}', '${cr.title}', '${cr.issueNo}', '${cr.description}', '${cr.thumbnail}.${cr.extension}', '${cr.upc}', '${cr.diamondCode}')`);
      // values for creator table
      cr.creators.items.forEach(c => {
        const temp = resourceURI.split('/');
        const id = temp[temp.length - 1];
        creatorValues.push(`('${id}', '${c.name}', '${c.role}')`);
        // also add values for junction table
        comicsCreatorJunctionValues.push(`('${cr.id}', '${id}')`);
      });

      // values for character comics junction table
      cr.characters.items.forEach(ch => {
        const temp = resourceURI.split('/');
        const id = temp[temp.length - 1];

        // only add for characters that were in the intial request
        if (charIds.includes(id)) {
          characterComicJunctionValues.push(`('${cr.id}', '${id}')`);
        }
      })
    })

    const characterQuery = `insert into marvel.Character\n
      (marvel.Character.marvel_character_id, marvel.Character.name, marvel.Character.image, marvel.Character.description, marvel.Character.team, marvel.Character.powers_abilities)\n
      values ${characterValues};`
    // upsert in case the values already exist
    const comicsQuery = `upsert into marvel.Comics\n
      (marvel.Comics.marvel_comics_id, marvel.Comics.digital_id, marvel.Comics.title, marvel.Comics.issue_no, marvel.Comics.description, marvel.Comics.cover, marvel.Comics.upc, marvel.Comics.diamondCode)\n
      values ${comicsValues.join(', ')};`;
    const creatorsQuery = `upsert into marvel.Creators\n
      (marvel.Comics.marvel_creator_id, marvel.Comics.digital_id, marvel.Comics.title, marvel.Comics.issue_no, marvel.Comics.description, marvel.Comics.cover, marvel.Comics.upc, marvel.Comics.diamondCode)\n
      values ${creatorValues.join(', ')}`;
    const characterComicJunction = `upsert into marvel.Character_Comics\n
      (marvel.Character_Comics.marvel_character_id, marvel.Character_Comics.marvel_comics_id)\n
      values ${characterComicJunctionValues.join(', ')}`;
    const comicsCreatorJunction = `upsert into marvel.Character_Comics\n
      (marvel.Character_Comics.marvel_character_id, marvel.Character_Comics.marvel_comics_id)\n
      values ${comicsCreatorJunctionValues.join(', ')}`;

    const allInserts = [await mySqlConnection(characterQuery), await mySqlConnection(comicsQuery), await mySqlConnection(creatorsQuery), await mySqlConnection(characterComicJunction), await mySqlConnection(comicsCreatorJunction)];

    if (allInserts.includes(false)) {
      return res.status(500).json({ message: "An error occurred with saving the characters" });
    }

    return res.status(200).json({ message: "Successfully updated character" });
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: `An error occurred with saving the character` });
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