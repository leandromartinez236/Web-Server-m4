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
    const params = req.url
      .replace("/api", "")
      .replace("/", "")
      .replace("%20", "");

    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      let html = fs.readFileSync(__dirname + "/index.html", "utf-8");
      res.end(html);
    } else if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(beatles));
    } else if (!req.url.includes("/api")) {
      const params = req.url.replace("%20", " ").replace("/", "");
      const beatle = beatles.find((item) => item.name === params);
      if (beatle) {
        res.writeHead(200, { "Content-Type": "text/html" });
        let html = fs.readFileSync(__dirname + "/beatle.html", "utf8"); //Codificamos el buffer para que sea una String
        html = html.replace("{beatleName}", beatle.name); // Usamos el método replace es del objeto String
        html = html.replace("{birthDate}", beatle.birthdate); // Usamos el método replace es del objeto String
        html = html.replace("{imgBeatle}", beatle.profilePic); // Usamos el método replace es del objeto String
        res.end(html);
      } else {
        res.end(`<h1>No existe ${params}</h1>`);
      }
    } else if (`/api/${params.includes(beatles.name)}`) {
      res.writeHead(200, { "Content-Type": "application/json" });
      const beatle = beatles.find((beatle) => (beatle.name = params));
      res.end(JSON.stringify(beatle));
    } else {
      res.end("<h1>Error</h1>");
    }
  })
  .listen(3000, () => console.log("Server running"));
