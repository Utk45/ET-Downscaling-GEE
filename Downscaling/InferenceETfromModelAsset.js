var geometry_3 = 
    /* color: #99ff99 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[79.21762200247022, 16.61823795210249],
          [79.21762200247022, 16.038364219069013],
          [79.50326653372022, 16.038364219069013],
          [79.50326653372022, 16.61823795210249]]], null, false),
    landsat = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    modis = ee.ImageCollection("MODIS/061/MOD16A2"),
    modis_old = ee.ImageCollection("MODIS/061/MOD16A2GF"),
    geometry2 = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[83.09840422541781, 21.087021633883467],
          [82.96812665237022, 19.693716847949123],
          [83.90845976864976, 19.726526278012535],
          [84.1003466051686, 21.03137405244188]]]),
    geometry = /* color: #ff2a01 */ee.Geometry.Polygon(
        [[[85.49547760237095, 21.864572916045386],
          [85.48496334303258, 21.83541562358197],
          [85.53362934339879, 21.828205047964413],
          [85.54654686201451, 21.86724138734217],
          [85.50084202040074, 21.875342827254354]]]),
    image = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Angul_2022-07-01_2023-06-30_LULCmap_10m"),
    image3 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Jajapur_2022-07-01_2023-06-30_LULCmap_30m"),
    image4 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/AEZ_13_2021-07-01_2022-06-30_LULCmap_10m"),
    image5 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/BIRBHUM_2022-07-01_2023-06-30_LULCmap_30m"),
    image6 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Dumka_2022-07-01_2023-06-30_LULCmap_30m"),
    image7 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/JAJAPUR_2022-07-01_2023-06-30_LULCmap_30m"),
    image8 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/aez4_2022_2023_LULCmap_10m"),
    image9 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/aez3_2022_2023_LULCmap_10m"),
    image10 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/aez1_2022_2023_LULCmap_10m"),
    image11 = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Bihar_2021-07-01_2022-06-30_LULCmap_10m"),
    image12 = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Koderma_2022-07-01_2023-06-30_LULCmap_10m"),
    image13 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Una_2022-07-01_2023-06-30_LULCmap_30m"),
    image14 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Ganjam_2022_2023UPD_LULCmap_10m"),
    image15 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Ganjam_2022_2023_LULCmap_10m"),
    image16 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Durg_2022_2023UPD_LULCmap_10m"),
    image17 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/AEZ_13_2022-07-01_2023-06-30_LULCmap_10m"),
    image18 = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Bihar_2022-07-01_2023-06-30_LULCmap_10m"),
    image19 = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Jamui_2022-07-01_2023-06-30_LULCmap_10m"),
    image20 = ee.Image("projects/ee-indiasat/assets/LULC_Final_Outputs_NewHierarchy/Ganjam_2022_2023_LULCmap_10m"),
    geometry3 = /* color: #d63000 */ee.Geometry.Point([84.65386905441673, 19.887246829923264]),
    geometry4 = 
    /* color: #0871ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[84.40324344406517, 19.515861983605838],
          [84.81900729904564, 19.382160650789306],
          [85.04903354416282, 19.757731842978032],
          [84.66210880051048, 19.90500249152688]]]),
    image2 = ee.Image("projects/ee-indiasat/assets/LULC_Version2_Outputs_NewHierarchy/Angul_2022-07-01_2023-06-30_LULCmap_10m"),
    geometry5 = 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[85.04939802516456, 20.850244950449884],
          [85.08231409419533, 20.84599376185785],
          [85.08759268153663, 20.85016474045626],
          [85.08737810481544, 20.869814910264918],
          [85.0563932262754, 20.873504043503157]]]);
          

//SET THE GEOMETRY AND DATE OF NEARBY LANDSAT FOR WHICH YOU WANT TO INFERENCE THE ET:

var input_geom = geometry5;
var start = '2022-09-01';
var end = '2022-09-30';


//CONFIGURABLE: enter MODEL ASSET NAME:

var assetName = "projects/vatsal-stiti/assets/rf_demo_7";

// For validation, add modis bands at 500:
var start_modis = '2022-09-01';
var end_modis = '2022-09-30';

var landsatmodified = landsat.filterDate(start,end);
var modismodify = modis_old.filterDate(start_modis,end_modis);
var humidity =  ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H').filterDate(start,end); 


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
// Map.addLayer(landsat_date);

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
  var newimg13 = ee.Image(newimg).select('LWdown_f_tavg').reproject(proj).rename('lw');
  var newimg14 = ee.Image(newimg).select('Qle_tavg').reproject(proj).rename('qle');
  var newimg15 = ee.Image(newimg).select('Qh_tavg').reproject(proj).rename('qh');
  var newimg16 = ee.Image(newimg).select('Qg_tavg').reproject(proj).rename('qg');
  var newimg17 = ee.Image(newimg).select('Swnet_tavg').reproject(proj).rename('swnet');
  var newimg18 = ee.Image(newimg).select('Lwnet_tavg').reproject(proj).rename('lwnet');
  var newimg19 = ee.Image(newimg).select('Tair_f_inst').reproject(proj).rename('tair');
  var newimage = image.addBands([newimg2,newimg3,newimg4,newimg5,newimg6,newimg7,newimg8,newimg9,newimg10,newimg11,newimg12, newimg13, newimg14, newimg15, newimg16, newimg17, newimg18, newimg19]);
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

print('Featyres: ', clipped_landsat_500.first());
//LOAD CLASSIFIER FROM ASSET: 

var featurebands = ['MSAVI','NDMI','NDVI','NDWI','SAVI','NDBI','NDIIB7','ALBEDO','LST','humid','rain','temp','psurf','canopy','sm','wind','root','soiltemp', 'runoff', 'sw', 'qle','qh','qg','swnet','lwnet','tair'];

var RandomForestasFeatCollection = ee.FeatureCollection(assetName).aggregate_array('tree').aside(print);
var classifier = ee.Classifier.decisionTreeEnsemble(RandomForestasFeatCollection);

// print('clipped_ET: ', modis_clipped);

var vis = {min: 0, max: 400, palette: ['brown','yellow','green']};

var original_et_500 = modis_clipped.first().select('ET');

Map.addLayer(original_et_500, vis, 'OriginalET_500');

var feature_image_500 = clipped_landsat_500.first().select(featurebands);
var predicted_et_500 = feature_image_500.classify(classifier);

var feature_image_30 = clipped_landsat_30.first().select(featurebands);
var predicted_et_30 = feature_image_30.classify(classifier);

print('Classified ET: ', predicted_et_500);
Map.addLayer(predicted_et_500, vis, 'PredictedET_500');
Map.addLayer(predicted_et_30, vis, 'PredictedET_30');
var classPalette = ['green','blue','black','brown','green','004400','yellow','yellow','green','yellow','yellow','yellow']; 
var final_lulc = image20.clip(input_geom); 
var lulc = final_lulc.select('predicted_label');
Map.addLayer(image2, {min: 1, max: 12, palette: classPalette});
print('LULC: ', final_lulc);
var exportParams_modis = {
  image: final_lulc,
  description: 'lulc_10',
  scale: 10, 
  crs: 'EPSG:4326',
  // crsTransform : [463.3127165279165
// ,0,-20015109.354,0,-463.3127165279167, 10007554.677003],
  fileNamePrefix: 'lulc_10',
  folder : 'ET_exports'
};

Export.image.toDrive(exportParams_modis);
