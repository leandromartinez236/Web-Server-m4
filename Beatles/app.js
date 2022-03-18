const http = require("http");
const fs = require("fs");

const beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/") {
      //Si la URL es / devolvemos el HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs.readFileSync(__dirname + "/index.html");
      res.end(html);
    }
    if (req.url === "/api") {
      //Si la URL es / devolvemos el html
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(beatles));
    }
    if (req.url.includes("/api/")) {
      const params = req.url.replace("%20", " ").replace("/api/", "");
      res.writeHead(200, { "Content-Type": "application/json" });
      const beatle = beatles.find((item) => item.name === params);
      res.end(JSON.stringify(beatle));
      console.log(params);
    }
    if (!req.url.includes("/api")) {
      res.writeHead(200, { "Content-Type": "text/html" });
      let html = fs.readFileSync(__dirname + "/beatle.html", "utf8");
      const params = req.url.replace("%20", " ").replace("/", "");
      const beatle = beatles.find((item) => item.name === params);
      if (beatle) {
        html = html.replace("{name}", beatle.name);
        html = html.replace("{birthdate}", beatle.birthdate);
        html = html.replace("{profilePic}", beatle.profilePic);
        res.end(html);
      }
    }
  })

  .listen(1337, "localhost");
