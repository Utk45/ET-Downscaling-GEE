var modis_old = ee.ImageCollection("MODIS/061/MOD16A2GF"),
    landsat = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    modis = ee.ImageCollection("MODIS/061/MOD16A2"),
    train_areas_aez_1to5 = ee.FeatureCollection("projects/vatsal-stiti/assets/aez_1to5_train_areas"),
    humidData = ee.ImageCollection("NASA/GLDAS/V021/NOAH/G025/T3H");
// CONFIGURABLE PARAMETERS:
// AREA
var index = 0;
var aez_patch = '1to5';
var train_patch = train_areas_aez_1to5;

// DATES
var year = '2022';
var season = 1;

//-------THIS CODE IS CONFIGURED ACCORDING TO THE PARAMETERES SET ABOVE-------

// IMPORT THE TRAINING AREA GEOMETRIES AND NAMES FROM THE ASSETs

var train_area_list = train_patch.toList(train_patch.size(), 0);
var input_geom = ee.Feature(train_area_list.get(index)).geometry();
print('input_geom:', input_geom);
// .geometry();
var input_name = ee.Feature(train_area_list.get(index)).get('name');

var start = '2022-09-01';
var end = '2022-09-30';
if(season == 1){
  start = year+'-01-01';
  end = year+'-04-30';
}
else if(season == 2){
  start = year+'-05-01';
  end = year+'-08-30';
}
else{
  start = year+'-09-01';
  end = year+'-12-30';
}
var folder= 'Train_Area_'+input_name;
var filename = year+'_'+season;

// Extract Landsat and Modis for required Dates:
var landsatmodified = landsat.filterDate(start,end);
var modismodify = modis_old.filterDate(start,end);
var humidity = humidData.filterDate(start,end); 

// print("humid bands: ", humidity.first());

// print("modis_modify :",modismodify);

var input_add = function(image){
  var newimg = image.set('input',input_geom);
  return newimg;
}
var final_update = function(image){
  var input_geom = ee.Feature(image.get('input')).geometry();
  var mygeom = image.geometry();
  var ls_geom = mygeom.intersection(input_geom);
  var area = ee.Number.parse(ls_geom.area());
  var newimg = image.set('area',area);
  return newimg;
}

var small_landsat = landsatmodified.map(input_add);
var chkpoint_landsat = small_landsat.map(final_update);
var on_shape_landsat = chkpoint_landsat.filter(ee.Filter.gt('area',0.0));

var adddate = function(image){
  var ymd = ee.String(image.id()).slice(-8);
  var date = ee.String(ymd.slice(6,8));
  var month = ee.String(ymd.slice(4,6));
  var year = ee.String(ymd.slice(0,4));
  var img1 = image.set('year',year);
  img1 = img1.set('month',month);
  img1 = img1.set('date',date);
  return img1;
}
var modisadd = function(image){
  var ymd = ee.String(image.get('system:index'));
  var year = ee.String(ymd.slice(0,4));
  var month = ee.String(ymd.slice(5,7));
  var date = ee.String(ymd.slice(8,10));
  var img1 = image.set('year',year);
  img1 = img1.set('month',month);
  img1 = img1.set('date',date);
  return img1;
}
var humidadd = function(image){
  var ymd = ee.String(image.id());
  var year = ee.String(ymd.slice(1,5));
  var month = ee.String(ymd.slice(5,7));
  var date = ee.String(ymd.slice(7,9));
  var img1 = image.set('year',year);
  img1 = img1.set('month',month);
  img1 = img1.set('date',date);
  return img1;	
}


// Landsat and modis with dates as properties 
var landsat_date = on_shape_landsat.map(adddate);
Map.addLayer(landsat_date);

// print("landsat date :",landsat_date);

var date_print = function(image){
  var date = image.get('date');
  var month = image.get('month');
  var empt_fea = ee.Feature(null);
  var fea = empt_fea.set('date',date);
  var fea1 = fea.set('month',month);
  return fea1;
}

////// DATES OF LANDSAT
var dates = landsat_date.map(date_print);
// print("dates" , dates);

var modis_date = modismodify.map(modisadd);


var humid_date = humidity.map(humidadd);
// print('humid date',humid_date);
// print('modis_date',modis_date);
var one_img = modis_date.first();
// print("this image :",one_img);

var clipping = function(image){
  var newimg = image.clip(input_geom);
  return newimg;
}
var mean_et = function(image){
  var meanValue = image.select('ET').reduceRegion({
    reducer: ee.Reducer.mean(),
  });
  return ee.Feature(null).set('et',meanValue);
}

var modis_clipped = modis_date.map(clipping);
// print("modis clipped :",modis_clipped);

var dates_modis = modis_clipped.map(date_print);

// Finding sweet point : 
// print("dates modis :",dates_modis);
// print("dates landsat size :",dates.size());


var modis_dates_list = dates_modis.toList(dates_modis.size(),0);
var landsat_dates_list = dates.toList(dates.size(),0);



var mean_ET = modis_clipped.map(mean_et);


// print("mean :",mean_ET);
  




var add_modis = function(image){
  var newimg = image.set('mymodis',modis_date);
  return newimg;
}
var add_humid = function(image){
  var newimg = image.set('myhumid',humid_date);
  return newimg;
}
var landsat_withmodisr = landsat_date.map(add_modis);
var landsat_withmodis = landsat_withmodisr.map(add_humid);
// print('with modis ',landsat_withmodis);

var Strict_datematch = function(image){
  var modiscoll = image.get('mymodis');
  modiscoll = ee.FeatureCollection(modiscoll);
  var date_ls = ee.String((image.get('date')));
  var month_ls = ee.String((image.get('month')));
  var year_ls = ee.String((image.get('year')));
  var newmodiscoll = ee.List([]);
  var siz = modiscoll.size();

  var iter = function(img_modis,newmodiscoll){
    var date_modis = ee.String((img_modis.get('date')));
    var month_modis = ee.String((img_modis.get('month')));
    var year_modis = ee.String((img_modis.get('year')));
    var dateclose = function(date_m,date_l,month_m,month_l,year_m,year_l){
      // Write the date matching algorithm here // DONE DONE
      // Use only ee.Algorithm.if(condition,statement1,statement2);
      // For conditions : always use exp1.equals(exp2) (Otherwise will always gives false because it is gee boolean object(can't be used with normal object))
      var dm = ee.Number.parse(date_m);
      var mm = ee.Number.parse(month_m);
      var ym = ee.Number.parse(year_m);
      var dl = ee.Number.parse(date_l);
      var ml = ee.Number.parse(month_l);
      var yl = ee.Number.parse(year_l);
      var modisDate = ee.Date.fromYMD(ym,mm,dm);
      var lsDate = ee.Date.fromYMD(yl,ml,dl);
      var dateDiff = modisDate.difference(lsDate, 'day').abs();
      // CONFIGURABLE
      return dateDiff.lt(1);
    };
    return ee.Algorithms.If(dateclose(date_modis,date_ls,month_modis,month_ls,year_modis,year_ls),ee.List(newmodiscoll).add(img_modis),ee.List(newmodiscoll));
  }

  var modis_close_collection = modiscoll.iterate(iter,newmodiscoll);
  var newimg = image.set('closemodis',modis_close_collection);
  return newimg;
}

var datematch = function(image){
  var modiscoll = image.get('mymodis');
  modiscoll = ee.FeatureCollection(modiscoll);
  var date_ls = ee.String((image.get('date')));
  var month_ls = ee.String((image.get('month')));
  var year_ls = ee.String((image.get('year')));
  var newmodiscoll = ee.List([]);
  var siz = modiscoll.size();

  var iter = function(img_modis,newmodiscoll){
    var date_modis = ee.String((img_modis.get('date')));
    var month_modis = ee.String((img_modis.get('month')));
    var year_modis = ee.String((img_modis.get('year')));
    var dateclose = function(date_m,date_l,month_m,month_l,year_m,year_l){
      // Write the date matching algorithm here // DONE DONE
      // Use only ee.Algorithm.if(condition,statement1,statement2);
      // For conditions : always use exp1.equals(exp2) (Otherwise will always gives false because it is gee boolean object(can't be used with normal object))
      var dm = ee.Number.parse(date_m);
      var mm = ee.Number.parse(month_m);
      var ym = ee.Number.parse(year_m);
      var dl = ee.Number.parse(date_l);
      var ml = ee.Number.parse(month_l);
      var yl = ee.Number.parse(year_l);
      var modisDate = ee.Date.fromYMD(ym,mm,dm);
      var lsDate = ee.Date.fromYMD(yl,ml,dl);
      var dateDiff = modisDate.difference(lsDate, 'day');
      // CONFIGURABLE
      var datebool = dateDiff.lte(6).and(dateDiff.gte(0));
      return datebool;
    };
    return ee.Algorithms.If(dateclose(date_modis,date_ls,month_modis,month_ls,year_modis,year_ls),ee.List(newmodiscoll).add(img_modis),ee.List(newmodiscoll));
  }

  var modis_close_collection = modiscoll.iterate(iter,newmodiscoll);
  var newimg = image.set('closemodis',modis_close_collection);
  return newimg;
}
var datematch_humid = function(image){

  var modiscoll = image.get('myhumid');
  modiscoll = ee.FeatureCollection(modiscoll);
  var date_ls = ee.String((image.get('date')));
  var month_ls = ee.String((image.get('month')));
  var year_ls = ee.String((image.get('year')));
  var newmodiscoll = ee.List([]);
  var siz = modiscoll.size();
  
  var iter = function(img_modis,newmodiscoll){
    var date_modis = ee.String((img_modis.get('date')));
    var month_modis = ee.String((img_modis.get('month')));
    var year_modis = ee.String((img_modis.get('year')));
    var dateclose = function(date_m,date_l,month_m,month_l,year_m,year_l){
      // Write the date matching algorithm here // DONE DONE
      // Use only ee.Algorithm.if(condition,statement1,statement2);
      // For conditions : always use exp1.equals(exp2) (Otherwise will always gives false because it is gee boolean object(can't be used with normal object))
      var dm = ee.Number.parse(date_m);
      var mm = ee.Number.parse(month_m);
      var ym = ee.Number.parse(year_m);
      var dl = ee.Number.parse(date_l);
      var ml = ee.Number.parse(month_l);
      var yl = ee.Number.parse(year_l);
      var modisDate = ee.Date.fromYMD(ym,mm,dm);
      var lsDate = ee.Date.fromYMD(yl,ml,dl);
      var dateDiff = modisDate.difference(lsDate, 'day').abs();
      // CONFIGURABLE
      return dateDiff.lt(1);
    };
    return ee.Algorithms.If(dateclose(date_modis,date_ls,month_modis,month_ls,year_modis,year_ls),ee.List(newmodiscoll).add(img_modis),ee.List(newmodiscoll));
  }
  var modis_close_collection = ee.FeatureCollection(modiscoll).iterate(iter,newmodiscoll);
  var newimg = image.set('closehumid',modis_close_collection);
  return newimg;

}
var matched_landsatr = ee.ImageCollection(landsat_withmodis).map(datematch);
var matched_landsat = ee.ImageCollection(matched_landsatr).map(datematch_humid);

var sweetpoint = ee.ImageCollection(landsat_withmodis).map(Strict_datematch);
// print("date near landsat",matched_landsat);
// print("sweetpoint :",sweetpoint);



var modis_intersection = function(image){
  var close_modis = ee.List(image.get('closemodis'));
  var close_modis_inter = ee.List([]);
  var image_geom = image.geometry();
  var intersection_iter = function(img, close_modis_inter){
    var modi_img_geom = ee.Image(img).geometry();
    var intersected_geom = image_geom.intersection(modi_img_geom);
    var modi_img_intersected = ee.Image(img).clip(intersected_geom);
    return ee.List(close_modis_inter).add(modi_img_intersected);
  }
  var close_modis_intersected = close_modis.iterate(intersection_iter,close_modis_inter);
  var newimg = image.set('close_modis_inter',close_modis_intersected);
  var modis_size = ee.List(close_modis_intersected).size();
  newimg = newimg.set('modis_inter_size', modis_size);
  return newimg;
}
var humid_intersection = function(image){
  var close_modis = ee.List(image.get('closehumid'));
  var close_modis_inter = ee.List([]);
  var image_geom = image.geometry();
  var intersection_iter = function(img, close_modis_inter){
    var modi_img_geom = ee.Image(img).geometry();
    var intersected_geom = image_geom.intersection(modi_img_geom);
    var modi_img_intersected = ee.Image(img).clip(intersected_geom);
    return ee.List(close_modis_inter).add(modi_img_intersected);
  }
  var close_modis_intersected = close_modis.iterate(intersection_iter,close_modis_inter);
  var newimg = image.set('close_humid_inter',close_modis_intersected);
  return newimg;
}


var landsat_modisintersectedr = matched_landsat.map(modis_intersection);
var landsat_modisintersected = landsat_modisintersectedr.map(humid_intersection);
print('landsat with near date modis and intersected',landsat_modisintersected);

landsat_modisintersected = landsat_modisintersected.filter(ee.Filter.gt('modis_inter_size', 0)); 
print('landsat with near date applying filter',landsat_modisintersected);
// Contains only images which have intersection with input file
// Contains the intersected landsat as property
// Contains the intesected modis as property
// Contains only images which have close modis date
// Map.addLayer(landsat_modisintersected);


// -------------------------- UPSCALING -----------------------------
var calculate = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  var savi = image.expression("((NIR-R)/(NIR+R+L))*(1+L)",{
    "NIR": image.select('SR_B5'),
    "R": image.select('SR_B4'),
    "L": 0.5
  }).rename("SAVI"); 
  var ndbi = image.expression("(SWIR - NIR)/(SWIR+NIR)", {
    "SWIR": image.select('SR_B6'),
    "NIR": image.select('SR_B5')
  }).rename("NDBI");
  var ndwi = image.expression("(green-NIR)/(green+NIR)", {
    "green": image.select('SR_B3'),
    "NIR": image.select('SR_B5')
  }).rename("NDWI");
  var ndmi = image.expression("(NIR-SWIR1)/(NIR+SWIR1)", {
    "NIR":image.select('SR_B5'),
    "SWIR1": image.select('SR_B6')
  }).rename("NDMI");
  var ndiib7 = image.expression("(NIR-SWIR2)/(NIR+SWIR2)",{
    "NIR":image.select('SR_B5'),
    "SWIR2": image.select('SR_B7')
  }).rename("NDIIB7");
  var msavi = image.expression("(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - R)) ) / 2", {
    "NIR":image.select('SR_B5'),
    "R":image.select('SR_B4')
  }).rename("MSAVI");
  var lst = image.expression("K1 * BT + K2" ,{
    'BT': image.select('ST_B10'),
    'K1': 0.00341802,
    'K2': 149.0
  }).rename('LST');
  var albedo = image.expression("((0.356*B1) + (0.130*B2) + (0.373*B3) + (0.085*B4) + (0.072*B5) -0.018) / 1.016",{
  'B1': image.select('SR_B1'),
  'B2': image.select('SR_B2'),
  'B3': image.select('SR_B3'),
  'B4': image.select('SR_B4'),
  'B5': image.select('SR_B5'),
  }).rename('ALBEDO');
  return image.addBands([ndvi, savi, ndbi, ndmi, ndwi, ndiib7, msavi, albedo, lst]);
}

var image_projection = landsat_modisintersected.first();
// print(image_projection, " This is projection 1");
var close_modis = ee.List(image_projection.get('close_modis_inter'));
// print(close_modis, " This is projection 2");
var close_modis_proj = ee.Image(close_modis.get(0));
print(close_modis_proj, " This is projection 3");
var proj = close_modis_proj.projection();
// print(proj, " This is projection 4");
var processImage = function(image) {
    return image.reduceResolution({
      reducer: ee.Reducer.mean(),
      bestEffort: true,
      maxPixels: 64
    }).reproject({
      crs: proj
    });
}

var landsat_orig_res = landsat_modisintersected.map(calculate);
print("landsat_orig_res :",landsat_orig_res);

var landsat_resampr = landsat_modisintersected.map(processImage).map(calculate);

///////////// RESAMPLING DONE, NOW ADDING ET AND OTHER FEATURES AS BANDS /////////

var add_humid = function(image){
  var newimg = ee.List(image.get('close_humid_inter')).get(0);
  var newimg2 = ee.Image(newimg).select('Qair_f_inst').reproject(proj).rename('humid');
  var newimg3 = ee.Image(newimg).select('Rainf_tavg').reproject(proj).rename('rain');
  var newimg4 = ee.Image(newimg).select('AvgSurfT_inst').reproject(proj).rename('temp');
  var newimg5 = ee.Image(newimg).select('Psurf_f_inst').reproject(proj).rename('psurf');
  var newimg6 = ee.Image(newimg).select('CanopInt_inst').reproject(proj).rename('canopy');
  var newimg7 = ee.Image(newimg).select('SoilMoi0_10cm_inst').reproject(proj).rename('sm');
  var newimg8 = ee.Image(newimg).select('Wind_f_inst').reproject(proj).rename('wind');
  var newimg9 = ee.Image(newimg).select('RootMoist_inst').reproject(proj).rename('root');
  var newimg10 = ee.Image(newimg).select('SoilTMP0_10cm_inst').reproject(proj).rename('soiltemp');
  var newimg11 = ee.Image(newimg).select('Qsb_acc').reproject(proj).rename('runoff');
  var newimg12 = ee.Image(newimg).select('SWdown_f_tavg').reproject(proj).rename('sw');
  var newimg14 = ee.Image(newimg).select('Qle_tavg').reproject(proj).rename('qle');
  var newimg15 = ee.Image(newimg).select('Qh_tavg').reproject(proj).rename('qh');
  var newimg16 = ee.Image(newimg).select('Qg_tavg').reproject(proj).rename('qg');
  var newimg17 = ee.Image(newimg).select('Swnet_tavg').reproject(proj).rename('swnet');
  var newimg18 = ee.Image(newimg).select('Lwnet_tavg').reproject(proj).rename('lwnet');
  var newimg19 = ee.Image(newimg).select('Tair_f_inst').reproject(proj).rename('tair');
  var newimage = image.addBands([newimg2,newimg3,newimg4,newimg5,newimg6,newimg7,newimg8,newimg9,newimg10,newimg11,newimg12, newimg14, newimg15, newimg16, newimg17, newimg18, newimg19]);
  return newimage;
}

var addBandET =function(image){
  var modisimage_s = ee.Image(ee.List(image.get('close_modis_inter')).get(0)).select('ET');
  var finalimage_s = image.addBands(modisimage_s);
  return finalimage_s;
}

var clipimage = function(image){
  var clipped = ee.Image(image).clip(input_geom);
  return clipped;
}
print("Landsat resampled :",landsat_resampr);

var landsat_500_a = landsat_resampr.map(add_humid);

print("Humid added: ", landsat_500_a.size());
var landsat_500 = landsat_500_a.map(addBandET);
print("ET added: ", landsat_500.size());
var landsat_30 = landsat_orig_res.map(add_humid);
var clipped_landsat_500 = landsat_500.map(clipimage);

var clipped_landsat_30 = landsat_30.map(clipimage);




//////////// BAND ADDED, GENERATING DATASET /////////////
/////////// USE GIVEN COLLECTIONS (landsat_500, landsat_30, clipped_landsat_500, clipped_landsat_30) accordingly.



var listsize = ee.Number(clipped_landsat_500.size());
var myList = ee.List.sequence(0, listsize.subtract(1));

function extractTrainData(number){
    var modellist_s = (clipped_landsat_500.toList(1,number));
    var finalimage_s = ee.Image(modellist_s.get(0));
    var trainingData2 = finalimage_s.sample({
      scale: 500,
      seed: 5,
      numPixels: 200
    });
    return trainingData2;
}

var trainingList = myList.map(extractTrainData);


var mergeCollections = function(collection, current) {
  return ee.FeatureCollection(current).merge(ee.FeatureCollection(collection));
};

var trainingData = ee.FeatureCollection([]);

var traindata_500 = ee.FeatureCollection(ee.List(trainingList).iterate(mergeCollections, trainingData));

// var dummyGeometry = ee.Geometry.Point([0, 0]);
// var TrainData = traindata_500.map(function(feature) {
//   var geometry = dummyGeometry;
//   return feature.setGeometry(geometry);
// });

print("Train size: ", traindata_500.size());

var bands = ['MSAVI','NDMI','NDVI','NDWI','SAVI','NDBI','NDIIB7','ALBEDO','LST','humid','rain','temp','psurf','canopy','sm','wind','root','soiltemp', 'runoff', 'sw','qle','qh','qg','swnet','lwnet','tair','ET'];
 
Export.table.toDrive({
  collection: traindata_500,
  description: filename,
  selectors:bands,
  fileFormat: 'CSV',
  fileNamePrefix: filename,
  folder : folder
});

Map.addLayer(landsat_500);


///////////// MOVE TO ANOTHER SCRIPT :(/Thread_ModelCreation/Model.js) ///////////////////
