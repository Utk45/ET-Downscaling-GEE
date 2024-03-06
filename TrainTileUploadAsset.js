var agro_eco_zones = ee.FeatureCollection("users/mtpictd/agro_eco_regions"),
    aez_1to5_1 = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[75.01503445077178, 30.276862971859252],
          [74.38881374764678, 29.467105606168815],
          [75.34462429452178, 28.92043388027305],
          [75.94887234139678, 29.82992701454943]]]),
    aez_1to5_2 = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[77.1880351099945, 28.099754734540124],
          [76.7156230006195, 27.380211331624043],
          [77.6494608912445, 26.87176312813896],
          [78.2317362818695, 27.760022547218544],
          [77.3088847193695, 28.245026515450792]]]),
    aez_1to5_3 = /* color: #00ffff */ee.Geometry.Polygon(
        [[[73.26697747749274, 27.136053616281586],
          [72.79456536811774, 26.39054627198514],
          [73.73938958686774, 25.976470844435692],
          [74.26673333686774, 26.744291061989326]]]),
    aez_1to5_4 = /* color: #bf04c2 */ee.Geometry.Polygon(
        [[[74.61793624890194, 24.800089931589177],
          [74.28834640515194, 23.949500419146847],
          [75.21119796765194, 23.76864604970956],
          [75.48585617077694, 24.650402815594987]]]),
    aez_1to5_5 = /* color: #ff0000 */ee.Geometry.Polygon(
        [[[80.05438156485306, 26.490829971479567],
          [79.65887375235306, 25.790592622021357],
          [80.61468429922806, 25.61240346857152],
          [80.87835617422806, 26.343243076824912]]]),
    aez_1to5_6 = /* color: #00ff00 */ee.Geometry.Polygon(
        [[[71.42629993514134, 22.836867089767306],
          [72.44802845076634, 22.56321425587577],
          [72.78860462264134, 23.271548476863533],
          [71.79983509139134, 23.563908724859814]]]),
    aez_1to5_7 = /* color: #0000ff */ee.Geometry.Polygon(
        [[[74.97855324295267, 22.522623835492304],
          [74.64896339920267, 21.52454477362647],
          [75.45096535232767, 21.31999840152704],
          [75.81351418045267, 22.28901441299601],
          [75.17630714920267, 22.482024344052153]]]),
    aez_1to5_8 = /* color: #999900 */ee.Geometry.Polygon(
        [[[77.07694191482767, 19.435430761587973],
          [77.75809425857767, 19.186593993158954],
          [78.03275246170267, 19.94228587618013],
          [77.30765480545267, 20.210573063586253]]]),
    aez_1to5_9 = /* color: #ff00ff */ee.Geometry.Polygon(
        [[[74.72421379934522, 18.67269828743169],
          [75.48227043997022, 18.443567318584414],
          [75.69101067434522, 19.28565019952553],
          [75.03183098684522, 19.4307631292681]]]),
    aez_1to5_10 = /* color: #ff9999 */ee.Geometry.Polygon(
        [[[75.50424309622022, 15.800652362906574],
          [76.26229973684522, 15.737215188724834],
          [76.38314934622022, 16.991596122891913],
          [75.69101067434522, 17.086132979659915]]]);
          

// EXTRACT THE AEZ FROM ASSET AND VIEW ON MAP, TO FILTER OUT TRAINING REGIONS

var aezList = agro_eco_zones.toList(agro_eco_zones.size(), 0);

var indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

var rgbVis = {
  min: 0,
  max: 3000
};

var show_aez = function(ind){
  var aez = ee.Feature(aezList.get(ind));
  var aez_name = 'AEZ_'+ind;
  Map.addLayer(aez, rgbVis, aez_name);
  return aez_name;
}

var areas = indices.map(show_aez);

// EXPORT THE TRAIN DATA OF A SPECIFIC AEZ-CLUSTER INTO A FEATURE COLLECTION

var input_areas = [aez_1to5_1, aez_1to5_2, aez_1to5_3, aez_1to5_4, aez_1to5_5, aez_1to5_6, aez_1to5_7, aez_1to5_8, aez_1to5_9, aez_1to5_10];
var area_names = ['aez_1to5_1', 'aez_1to5_2', 'aez_1to5_3', 'aez_1to5_4', 'aez_1to5_5', 'aez_1to5_6', 'aez_1to5_7', 'aez_1to5_8', 'aez_1to5_9', 'aez_1to5_10'];

var featureList = ee.FeatureCollection(input_areas.map(function(geometry, index) {
  return ee.Feature(geometry, {'name': area_names[index]});
}));

var assetPathName = 'projects/vatsal-stiti/assets/aez_1to5_train_areas';

Export.table.toAsset({
  collection: featureList,
  description: 'ExportTrainAreasAsAsset',
  assetId: assetPathName
});



























