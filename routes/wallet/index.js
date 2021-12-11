var express = require("express");
var router = express.Router();
const lightwallet = require("eth-lightwallet");
const fs = require("fs");

// TODO : lightwallet 모듈을 사용하여 랜덤한 니모닉 코드를 얻습니다.
router.post("/newMnemonic", async (req, res) => {
  try {
    let mnemonic = lightwallet.keystore.generateRandomSeed();
    res.json({ mnemonic });
  } catch (e) {
    console.log(e);
  }
});
// enable myth hazard achieve farm never indoor despair this spray slush cancel
// TODO : 니모닉 코드와 패스워드를 이용해 keystore와 address를 생성합니다.
router.post("/newWallet", async (req, res) => {
  let password = req.body.password;
  let mnemonic = req.body.mnemonic;

  try {
    lightwallet.keystore.createVault(
      {
        password: password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      (err, ks) => {
        ks.keyFromPassword(password, (err, key) => {
          ks.generateNewAddress(key, 1);

          let address = ks.getAddresses().toString();
          let keystore = ks.serialize();

          fs.writeFile("keystore.json~!", keystore, (err, data) => {
            if (err) {
              res.json({ message: "이게 왜됨??" });
            } else {
              res.json({ message: "이게 왜 됨??" });
            }
          });

          fs.writeFile("address.json~!", address, (err, data) => {
            if (err) {
              res.json({ message: "이게 왜됨??" });
            } else {
              res.json({ message: "이게 왜 됨??" });
            }
          });
          //   res.json({ keystore: keystore, address: address });
        });
      }
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
