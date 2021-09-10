var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var apiversion='/api/v1';


//MYSQL Connection
var db = require('./config/db.config');


var port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Get all farmers
app.get(apiversion + '/farmers',  function (req, res)  {  

  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.query('SELECT * FROM farmers', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: 'farmers', data: results });
  });

  
});



//put farmers by Id
app.put(apiversion + '/farmer/:farmerId',  function (req, res)  {  

  var farmerId = Number(req.body.studentid);
  var farmerName = req.body.studentName;
  var farmerAddress = req.body.farmersAddress;
  var farmerAge = Number(req.body.farmersAge);
  var plantPictuer = req.body.plantPictuer;


  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`UPDATE farmers 
            Set
               farmerId = ${farmerId},
               farmerName = '${farmerName}'
			   farmerAddress = '${farmerAddress}'
			   farmerAge = ${farmerAge},
			   plantPictuer = '${plantPictuer}'


  
            where farmerId='${farmerId}';`,function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, message: ' Modified farmer' });
   });

});


//Delte farmer by Id
app.delete(apiversion + '/farmer/:farmerId',  function (req, res)  {  

  var farmerId = req.params.farmerId;

  res.setHeader('Co2ntent-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  
  db.query(`DELETE from farmers WHERE farmerId =${farmerId};`,function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, message: ' Delte farmer' });
  });

   
});

app.listen(port, function () {
	console.log("Server is up and running...");
  });



