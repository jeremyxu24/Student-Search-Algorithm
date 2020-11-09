function getIEP() {
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw")
    var folder2 = folder.getFolders();
    console.log('hey')
    var currentSheet = SpreadsheetApp.getActive().getSheetByName("Sheet13")
    currentSheet.getRange(1,6,150,2).clearContent()
    i=1
    while(folder2.hasNext()){
      var folder3 = folder2.next();
      var folderId = folder3.getId()
      var inFolder = DriveApp.getFolderById(folderId)
      var filesIterator = inFolder.getFolders()
      while(filesIterator.hasNext()){
        var file = filesIterator.next();
        var fileName = file.getName().split(",")
        var fileName = fileName[1] + " " +fileName.slice(0,-1)
        var fileUrl = file.getUrl()
        currentSheet.getRange(i,6,1,2).setValues([[fileName,fileUrl]])
        console.log(fileName, fileUrl)
        i+=1                      
      }
    }
  }
