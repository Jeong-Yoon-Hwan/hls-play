const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
for (let i = 0; i < 50; i++) {
  app.use(
    `/video/${i.toString().padStart(2, "0")}`,
    express.static(path.join(__dirname, `util/CH${i}`))
  );
}

// app.use("/video/01", express.static(path.join(__dirname, "util/CH1")));
// app.use("/video/02", express.static(path.join(__dirname, "util/CH2")));
// app.use("/video/03", express.static(path.join(__dirname, "util/CH3")));
// app.use("/video/04", express.static(path.join(__dirname, "util/CH4")));
// app.use("/video/05", express.static(path.join(__dirname, "util/CH5")));
// app.use("/video/06", express.static(path.join(__dirname, "util/CH6")));
// app.use("/video/07", express.static(path.join(__dirname, "util/CH7")));
// app.use("/video/08", express.static(path.join(__dirname, "util/CH8")));

app.listen(3000, () => {
  console.log("server run 3000...");
});
