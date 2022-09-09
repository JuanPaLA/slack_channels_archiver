require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const token = process.env.token
const web = new WebClient(token);
const channels = require('./channles');

let err = 0;
let succ = 0;

//function to archive channels
async function archiver(c_id) {
  try {
    const result = await web.conversations.archive({
      token: token,
      channel: c_id
    })
    result.ok === true ? succ++ : null;
    console.log(result.ok);
    console.log(`Errores: ${err} - Success: ${succ}`);
  } catch (e) {
    err++;
    console.log(e.data.error);
    console.log(`Errores: ${err} - Success: ${succ}`);
  }
}

//function to loop  archive functions
function archiveLooper(arr, start, end) { // replace arr with channels variable
  for (var i = start; i < end; i++) {
    archiver(arr[i]);
  }
}



