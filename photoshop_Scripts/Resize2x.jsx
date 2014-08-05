/*
   Photoshop Script ResizeRetinaToNormal.jsx
   Finds @2x.png image files for retina display in the specified folder and 
   resize them to the half size for normal display.
*/

// Keep the original unit and change it to pixcel
var strtRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

// Select folder
var sourceFolder = Folder.selectDialog("请选择包含有\"@2x\"大图的文件夹.");
var destFolder = Folder.selectDialog ("请选择裁剪后小图需要存放的文件:", sourceFolder);

var fileList = sourceFolder.getFiles("*@2x.png");
for (var s in fileList){
    var file = fileList[s];
    open(file);

    // resize image
    activeDocument.resizeImage(
        activeDocument.width / 2.0,
        activeDocument.height / 2.0,
        activeDocument.resolution,
        ResampleMethod.BICUBIC);
    
    var resizedFileName = activeDocument.name.match(/(.*)\@2x.[^\.]+$/)[1];

    // save
    var saveFile = new File(destFolder.absoluteURI + "/" + resizedFileName + ".png");

    var webSaveOptions = new ExportOptionsSaveForWeb();
    webSaveOptions.format = SaveDocumentType.PNG;
    webSaveOptions.PNG8 = false;
    webSaveOptions.transparency = true; 
    activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, webSaveOptions);

    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

// Revert the unit preference
preferences.rulerUnits = strtRulerUnits;