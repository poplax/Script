#target photoshop

main();

function main ()
{
	if (0 < app.documents.length)
	{
		alert ("请关闭所有打开的文件");
		return;
	}

	// Use folder selection dialogs to get the location of the input files
	// and where to save the new output files.
	var sourceFolder = Folder.selectDialog ("Please choose the location of the source image files.", Folder.myDocuments);
	var destFolder = Folder.selectDialog ("Please choose a location where the new image files will be saved.", sourceFolder);

	var files = sourceFolder.getFiles();
	for (var i = 0; i < files.length; i++)
	{
		var f = files[i];
		if (f instanceof Folder)
			continue;

		// If there are no other documents open doc is the active document.
		var doc = app.open (f);
        
		var layer = doc.artLayers.add ();
		layer.bounds = [0,0,doc.width,doc.height];

		// Now make the layer into a text layer and set parameters.
		// The text will be centered, in the hideous default font, and white.
		// Note that font size depends not just on the point size, but also
		// on the resolution, which is NOT being set anywhere.
		layer.kind = LayerKind.TEXT;
		layer.textItem.position = [Math.round (doc.width / 2),Math.round (doc.height / 2)];
		layer.textItem.justification = Justification.CENTER;
		layer.textItem.color.rgb.hexValue = "FFFFFF";
		layer.textItem.size = 60;

		// Get the file name and set it as the text this assumes the full path is not wanted.
		// to set the full path swap fsname for name.
        
		layer.textItem.contents = File.decode (f.name);

		doc.flatten ();

		// Save as a new JPG file with these options.
		var options = new JPEGSaveOptions ();
		options.quality = 8;

		var outputFile = new File (destFolder.absoluteURI + "/" + f.name);
		doc.saveAs (outputFile, options, false, Extension.LOWERCASE);

		doc.close ();
	}
}

