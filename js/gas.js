/*function doPost(e) {


var plantel = e.parameter.plantel
var data = e.parameter.data
var contratos = e.parameter.contratos


var doc = SpreadsheetApp.openById("1E263HYnhEXopTSs3csS5asoEiLPuD2l_NFqiUfvQo1A"); 
var ts = doc.getSheetByName("Hoja 1");

ts.getRange("A2").setVaue(JSON.stringify(contratos));


}

*/

var SHEET_NAME = "Settings";
var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service


function doPost(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);
  
  var plantel = 'pm'
  //  var plantel = e.parameter.plantel
  //    var data = JSON.parse(e.parameter.data);
  var data = {
    "cena": {},
    "jazz": {},
    "artes": {},
    "comida": {},
    "futbol": {},
    "papilla": {},
    "teclado": {},
    "biberón": {},
    "desayuno": {
      "2018-09-05": ["2", "14"],
      "2018-09-06": ["1", "2", "14"],
      "2018-09-07": ["1"]
    },
    "guitarra": {},
    "catesismo": {},
    "mini tennis": {},
    "tai kwon do": {},
    "danza árabe": {},
    "club de tareas": {},
    "teatro musical": {},
    "tiempo extendido": {
      "2018-09-05": {
        "16": "18:06:11"
      },
      "2018-09-06": {
        "17": "8:13:24",
        "18": "6:00:08",
        "19": "8:52:31"
      },
      "2018-09-07": {
        "16": "8:04:44",
        "17": "7:15:29",
        "18": "7:15:12",
        "19": "7:15:28"
      }
    },
    "taller de inglés": {}
  };
  //  var contratos = JSON.parse(e.parameter.contratos);  
  var contratos = [{
    "id": "1",
    "apellidoPaterno": "Jurado",
    "apellidoMaterno": "Jaramillo",
    "nombres": "Agustin Alejandro",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "2",
    "apellidoPaterno": "Jurado",
    "apellidoMaterno": "Patoni",
    "nombres": "Valentina Nicole",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "3",
    "apellidoPaterno": "Azotea",
    "apellidoMaterno": "Muciño",
    "nombres": "Moises",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "8",
    "apellidoPaterno": "Álvarez",
    "apellidoMaterno": "Álvarez",
    "nombres": "Eugenio",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "12",
    "apellidoPaterno": "Patoni",
    "apellidoMaterno": "Moreno",
    "nombres": "Liliana Monserrat",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "13",
    "apellidoPaterno": "Jaramillo",
    "apellidoMaterno": "Carbajal",
    "nombres": "Raquel",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "14",
    "apellidoPaterno": "Jurado",
    "apellidoMaterno": "Cuesta",
    "nombres": "Agustín Cesar",
    "servicio": "desayuno",
    "plantel": "SM"
  }, {
    "id": "15",
    "apellidoPaterno": "Jurado",
    "apellidoMaterno": "Patoni",
    "nombres": "Valentina Nicole",
    "servicio": "desayuno",
    "plantel": "KM"
  }, {
    "id": "16",
    "apellidoPaterno": "Jurado",
    "apellidoMaterno": "Patoni",
    "nombres": "Valentina Nicole",
    "servicio": "tiempo extendido",
    "plantel": "SM"
  }, {
    "id": "17",
    "apellidoPaterno": "Patoni",
    "apellidoMaterno": "Moreno",
    "nombres": "Liliana Monserrat",
    "servicio": "tiempo extendido",
    "plantel": "SM"
  }, {
    "id": "18",
    "apellidoPaterno": "Dao",
    "apellidoMaterno": "Ming",
    "nombres": "Si",
    "servicio": "tiempo extendido",
    "plantel": "SM"
  }, {
    "id": "19",
    "apellidoPaterno": "Hua",
    "apellidoMaterno": "Ze",
    "nombres": "Lei",
    "servicio": "tiempo extendido",
    "plantel": "SM"
  }]
  
  var obj = {};
  var result = [];
  var result2 = [];
  var arr = [];
  var plantelMap = {
    'pm': 2,
    'pt': 3,
    'sm': 4,
    'st': 5
  }
  
  for (i = 0; i < contratos.length; i++) { //Uniques sheets / conceptos / servicios
    obj[contratos[i].servicio] = {};
  }
  var sheets = Object.keys(obj);
  
  
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("1E263HYnhEXopTSs3csS5asoEiLPuD2l_NFqiUfvQo1A"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    sheet.getRange(plantelMap[plantel], 1).setValue(JSON.stringify(contratos));
    sheet.getRange(plantelMap[plantel], 2).setValue(JSON.stringify(data));
    /*   for (i=0; i<sheets.length; i++) {
    doc.insertSheet(sheets[i]);
    } */
    
    
    var checkContratos = JSON.parse(sheet.getRange(plantelMap[plantel], 1).getValue());
    
    if (checkContratos !== contratos) {
      sheet.getRange("D2").setValue('Oh oh there were changes, lets update everything');
      
      for (i = 0; i < sheets.length; i++) {
        arr.push([]);
      }
      
      for (j = 0; j < arr.length; j++) {
        var secondaryObj = {};
        var subObj = {};
        for (i = 0; i < contratos.length; i++) {
          if (contratos[i].servicio === sheets[j]) {
            subObj[contratos[i].id] = [contratos[i].apellidoPaterno, contratos[i].apellidoMaterno, contratos[i].nombres].join(' ');
            secondaryObj[sheets[j]] = subObj;
          }
        }
        arr[j].push(secondaryObj);
      }
      
      for (i = 0; i < arr.length; i++) {
        var ts = doc.getSheetByName(sheets[i]);
        var index = arr[i];
        var concepto = index[0];
        var datos = concepto[sheets[i]];
        
        
        var id = Object.keys(datos);
        var values = Object.keys(datos).map(function (e) {
          return datos[e]
        })
        
        for (j = 0; j < id.length; j++) {
          result.push([id[j]]);
        }
        for (j = 0; j < values.length; j++) {
          result2.push([values[j]]);
        }
        
        
        ts.getRange(2, 1, result.length).setValues(result);
        ts.getRange(2, 2, result2.length).setValues(result2);
        result = [];
        result2 = [];
      }
    } else {
      sheet.getRange("D2").setValue('They are the same nice');
    }
    
    for (i = 0; i < sheets.length; i++) {
      var ts = doc.getSheetByName(sheets[i]);
      var dataRange = ts.getDataRange().getValues();
      var porConcepto = data[sheets[i]];
      var conceptos = Object.keys(porConcepto);
      ts.getRange(1, 3, 1, conceptos.length).setValues([conceptos]);
      var comensales = Object.keys(porConcepto).map(function (e) {
        return porConcepto[e]
      })
      var arr = [];
      var p = [];
      
      for (k = 1; k < dataRange.length; k++) {
        arr.push(['-']);
      }
      
      
      
      if (sheets[i] === "tiempo extendido") {
        
        for (j = 0; j < comensales.length; j++) {
          var regs = comensales[j];
          
          var IDS = Object.keys(regs);
          
          var timestamp = Object.keys(regs).map(function (e) {
            return regs[e]
          })
          
          
          for (j = 0; j < IDS.length; j++) {
            for (k = 1; k < dataRange.length; k++) {
              if (IDS[j] == dataRange[k][0]) {
                p.push(k - 1);
                
              }
            }
            arr.splice(p[j], 1, [timestamp[j]]);
           
          }
           
          
        }
        ts.getRange(2, 3+j, arr.length, arr[0].length).setValues(arr);
            var arr = [];
        
      } else {
        
        
        var IDS = comensales[i];
        
        for (j = 0; j < IDS.length; j++) {
          
          for (k = 1; k < dataRange.length; k++) {
            
            if (IDS[j] == dataRange[k][0]) {
              
              p.push(k - 1);
              
              
            }
            
          }
          
          
          arr.splice(p[j], 1, ['Yes']);
          ts.getRange(2, 3+j, arr.length, arr[0].length).setValues(arr);
          var arr = [];
        }
        
      }
      
      Logger.log(arr);

      
      
      
    }
    
    
    // return json success results
    return ContentService
    .createTextOutput(JSON.stringify({
      "result": "success"
    }))
    .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    // if error return this
    return ContentService
    .createTextOutput(JSON.stringify({
      "result": "error",
      "error": e
    }))
    .setMimeType(ContentService.MimeType.JSON);
  } finally { //release lock
    lock.releaseLock();
  }
}


function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("1E263HYnhEXopTSs3csS5asoEiLPuD2l_NFqiUfvQo1A", doc.getId());
}