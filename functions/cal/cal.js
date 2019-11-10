/* eslint-disable */
const fetch = require("node-fetch");

const webCalURL = id =>
  `http://www.webcal.fi/cal.php?id=${id}&format=json&start_year=current_year&end_year=current_year&tz=Europe%2FHelsinki`;

const calendars = {
  holidays: webCalURL(1),
  goodToKnow: webCalURL(32)
};

exports.handler = async function(event, context) {
  try {
    const ids = Object.keys(calendars);
    const urls = Object.values(calendars);

    const responses = await Promise.all(urls.map(url => fetch(url)));
    const errored = responses.find(r => !r.ok);
    if (errored) {
      return { statusCode: errored.status, body: errored.statusText };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        [].concat.apply(
          [],
          await Promise.all(
            responses.map(async (r, index) => {
              const data = await r.json();
              const id = ids[index];
              return data.map(d => ({ ...d, source: id }));
            })
          )
        )
      )
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
