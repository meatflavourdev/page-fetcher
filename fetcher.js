// fetcher.js
const request = require("request");
const fs = require("fs");
const readline = require("readline");

// Get args from command line
const [url, path] = process.argv.slice(2);



const fetch = function (url, path) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Request failed 😞 -------------------------");
      console.log(error);
      rl.close();
      return false;
    }

    console.log("statusCode:", response && response.statusCode);

    try {
      if (fs.existsSync(path)) {
        //file exists
        rl.question("File exists. Overwrite? (Y/n)", (answer) => {
          if (answer === "y" || answer === "Y") {
            fs.writeFile(path, body, { encoding: "utf8" }, (error) => {
              if (error) {
                console.log("Write failed 😞 -------------------------");
                console.log(error);
                rl.close();
                return;
              }
              console.log("File saved.");
              rl.close();
            });
          } else {
            rl.close();
            return;
          }
        });
      }
    } catch (err) {
      rl.close();
      console.error(err);
    }
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Detect empty input or fetch
if (!url) {
  console.log(`URL is required-- recieved: ${url}`);
  rl.close();
} else if (!path) {
  console.log(`Path is required-- recieved: ${path}`);
  rl.close();
} else {
  console.log(`Fetching: ${url}`);
  console.log(`Saving: ${path}`);
  fetch(url, path);
}
