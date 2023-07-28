export default function handler(req, res) {
  let pincodes={
    "721302":["Kharagpur","West Bengal"],
    "125112":["Hisar","Haryana"]
  }
    res.status(200).json(pincodes)
  }
  