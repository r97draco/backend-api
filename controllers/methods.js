// Imported fs module to perform Read and Write operations to the data.json file in root directory.
import fs from "fs";

const filename = "./data.json"
let DATABASE = JSON.parse(fs.readFileSync(filename));

//------------Start of get_acronym------------------------------------------
// Method to get acronyms, it can take 3 params- page, limit and search if none are given it uses default values
export const get_acronym = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  let search = req.query.search || '';
  search = search.toLowerCase();

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  //Perform Fuzzy search in against values in DB
  const results = DATABASE.filter(acronym => {
    return acronym.acronym.toLowerCase().includes(search) || acronym.definition.toLowerCase().includes(search);
  });
  const paginatedResults = results.slice(startIndex, endIndex);

  //To set the headers for response data
  res.setHeader('X-Total-Count', results.length);
  res.setHeader('X-Total-Pages', Math.ceil(results.length / limit));
  res.setHeader('X-Current-Page', page);
  if (endIndex < results.length) res.setHeader('X-Next-Page', page + 1);
  if (startIndex > 0) res.setHeader('X-Prev-Page', page - 1);
  console.log(`Acronyms sent from the Database`);

  res.status(200).json(paginatedResults);
};
//------------End of get_acronym-----------------------------------


//------------Start of create_acronym------------------------------
// Create new Acronyms, it assigns random ID if no ID is sent in the body.
export const create_acronym = (req, res) => {
  const id= req.body._id || Math.floor(Math.random() * 1000000).toString();
  const acronym = req.body.acronym || "";
  const definition = req.body.definition || "";

  const newAcronym = {
    _id: id,
    acronym: acronym,
    definition: definition
  };

  DATABASE.push(newAcronym);

  //Save the Data to DB
  fs.writeFile(filename, JSON.stringify(DATABASE), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error: File opertation could not be completed!');
      return;
    }
    console.log(`Acronym with ID:${newAcronym._id} saved to Database`);
  });

  res.status(201).json(newAcronym);
};
//------------End of create_acronym-----------------------------------


//------------Start of update_acronym---------------------------------
//Update existing acronyms, it takes ID param and acronym and definition in the PATCH request body.
export const update_acronym = (req, res) => {
  const acronymID = req.params.acronymID;
  let updatedAcronym = req.body;
  updatedAcronym._id = acronymID;

  const index = DATABASE.findIndex(acronym => acronym._id === acronymID);

  if(index === -1){
    console.log(`Acronym with ID ${acronymID} not found`);
    res.status(404).send(`Acronym with ID ${acronymID} not found`);
    return;
  }
  DATABASE[index] = updatedAcronym;

  //Save the Data to DB
  fs.writeFile(filename, JSON.stringify(DATABASE), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error: File opertation could not be completed!');
      return;
    }
    console.log(`Acronym with ID:${acronymID} updated in Database`);
  });

  res.json(DATABASE[index]);
};
//------------End of update_acronym-----------------------------------


//------------Start of delete_acronym---------------------------------
//Delete existing acronyms, it takes ID param.
export const delete_acronym = (req, res) => {
  const acronymID = req.params.acronymID;

  const index = DATABASE.findIndex(acronym => acronym._id === acronymID);
  
  if (index === -1) {
    console.log(`Acronym with ID ${acronymID} not found`);
    res.status(404).send(`Acronym with ID ${acronymID} not found`);
    return;
  }

  DATABASE = DATABASE.filter(acronym => acronym._id != acronymID);

  //Save the Data to DB
  fs.writeFile(filename, JSON.stringify(DATABASE), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error: File opertation could not be completed!');
      return;
    }
    console.log(`Acronym with ID:${acronymID} deleted from Database`);
  });

  res.status(204).send(`Deleted Acronym with ID ${acronymID}`);
}
//------------End of delete_acronym-----------------------------------

