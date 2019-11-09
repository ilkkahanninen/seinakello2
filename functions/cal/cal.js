/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  try {
    const response = await fetch(
      "http://www.webcal.fi/cal.php?id=3&format=json&start_year=current_year&end_year=current_year&tz=Europe%2FHelsinki"
    );
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    return {
      statusCode: 200,
      body: await response.text()
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
