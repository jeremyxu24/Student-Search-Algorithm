function addUserProtect(){
    var currentSS = SpreadsheetApp.getActive().getSheetByName("AllFunctions")
    var email = currentSS.getRange('B3').getValue()
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
    var dsFolder = DriveApp.getFolderById("1yDUYs2fJzsldk_sjgaphGwlQJ")
    var dsAccess = dsFolder.addEditor(email)
    var access = folder.addEditor(email)
    var filesIterator = folder.getFiles();
    var ssTab;
    while(filesIterator.hasNext()){
      var file = filesIterator.next();
      var ssID = file.getId()
      var name = file.getName()
      console.log(name)
      var ss = SpreadsheetApp.openById(ssID).getSheets()
      for (var i = 0; i < ss.length ; i++ ){
        var protections = ss[i].getProtections(SpreadsheetApp.ProtectionType.SHEET)
        if (protections[0]!=undefined){
          var protection = protections[0].addEditor(email)
        }
      }
      }
    var clear = currentSS.getRange('B3').setValue("")
  }

function resetEverything() {
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
    var filesIterator = folder.getFiles();
    var ssTab;
    var templateCells = []
  
    for (i=2;i<=151;i++) {
      var date = '=if(B'+i.toString()+'<>"",If(A'+i.toString()+'="",now(),A'+i.toString()+'),"")'
      var class2 = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,2,0),"+'"")'
      var teacher = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,3,0),"+'"")'
      var supportStaff = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,6,0),"+'"")'
      templateCells.push([date,"",class2,teacher,supportStaff,"",false,false])
    }
    
    while(filesIterator.hasNext()){
      var file = filesIterator.next();
      var ssID = file.getId()
      var ss2 = SpreadsheetApp.openById(ssID); 
      var ss = SpreadsheetApp.openById(ssID);
      ss.getSheetByName("Current Assignments");
      ss2.getSheetByName("All Missing Assignments");
      
      for (i=1;i<=8;i++) {
         ss.getActiveSheet().getRange('H'+(i+3).toString()).setValue("")
         ss.getActiveSheet().getRange('I'+(i+3).toString()).setValue("")
         ss.getActiveSheet().getRange('L'+(i+3).toString()).setValue("")
         ss.getActiveSheet().getRange('J'+(i+3).toString()).setValue("=if(H"+(i+3).toString()+'="","",vlookup(concatenate(H'+(i+3).toString()+',I'+(i+3).toString()+'),WhiteBoard!$F:$J,4,0))')
         ss.getActiveSheet().getRange('K'+(i+3).toString()).setValue("=if(H"+(i+3).toString()+'="","",vlookup(concatenate(H'+(i+3).toString()+',I'+(i+3).toString()+'),WhiteBoard!$F:$J,5,0))')
      }
      ss2.getSheetByName("All Missing Assignments").getRange(2,1,150,8).setValues(templateCells)      
    }
  }
  
  function resetAllAssignments() {
    var templateCells = []
    for (i=2;i<=151;i++) {
      var date = '=if(B'+i.toString()+'<>"",If(A'+i.toString()+'="",now(),A'+i.toString()+'),"")'
      var class2 = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,2,0),"+'"")'
      var teacher = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,3,0),"+'"")'
      var supportStaff = "=iferror(vlookup(B"+i.toString()+",'Current Assignments'!$G$4:$L$11,6,0),"+'"")'
      templateCells.push([date,"",class2,teacher,supportStaff,"",false,false])
    }
    
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
    var filesIterator = folder.getFiles();
    var ssTab;
    while(filesIterator.hasNext()){
      var file = filesIterator.next();
      var ssID = file.getId()
      var ss = SpreadsheetApp.openById(ssID); 
      ss.getSheetByName("All Missing Assignments").getRange(2,1,150,8).setValues(templateCells)
    }
  }
  
function orderByAscending(){
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
    var filesIterator = folder.getFiles();
    var ssTab;
    while(filesIterator.hasNext()){
      var file = filesIterator.next();
      var ssID = file.getId()
      var ss = SpreadsheetApp.openById(ssID);
      var fileName = ss.getSheetByName("Current Assignments")
      var getCell = fileName.getRange('A3').setValue("=query('All Missing Assignments'!A1:J150,"+'"select A, B, C, D, F where H=FALSE", 1)')
      }
   }
  
function orderByDescending(){
    var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
    var filesIterator = folder.getFiles();
    var ssTab;
    while(filesIterator.hasNext()){
      var file = filesIterator.next();
      var ssID = file.getId()
      var ss = SpreadsheetApp.openById(ssID);
      var fileName = ss.getSheetByName("Current Assignments")
      var getCell = fileName.getRange('A3').setValue("=query('All Missing Assignments'!A1:J150,"+'"select A, B, C, D, F where H=FALSE order by A desc", 1)')
      }
   }

function deleteMakeCopies() {
  // delete all files in folder
  var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
  var filesIterator = folder.getFiles();
  var ssTab;
  while(filesIterator.hasNext()){
    var file = filesIterator.next();
    var ssID = file.getId()
    var deleteFile = folder.removeFile(DriveApp.getFileById(ssID))
}
  // move file in
  var sourceFileId = 'zAlUJg_12zXxPwdGwqaaPljhdO2cxw';
  var destinationFolderId = "zAlUJg_12zXxPwdGwqaaPljhdO2cxw";
  
  var file = DriveApp.getFileById(sourceFileId);
  DriveApp.getFolderById(destinationFolderId).addFile(file);
  file
  .getParents()
  .next()
  .removeFile(file);
  
  
  // make copies
  var currentSheet = SpreadsheetApp.getActive().getSheetByName('Sheet1')
  var currentRange = currentSheet.getRange(2,1,150,1).getValues()
  var newList = []
  for (i=0;i<currentRange.length;i++){
    if (currentRange[i]!=""){
      newList.push(currentRange[i])
    }
    }
  var editors = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').getEditors();
  var viewers = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').getViewers();
  console.log(newList)
  for (i=0;i<newList.length;i++){
    var file = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').makeCopy();
    var fileId = file.getId()
    var name = file.setName(newList[i])
    console.log(newList[i])
  }

// give access to users  
  var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
  var filesIterator = folder.getFiles();
  while(filesIterator.hasNext()){
    var file = filesIterator.next();
    var ssID = file.getId()
    var name = file.getName()
    console.log(name)
    var ss2 = SpreadsheetApp.openById(ssID).getSheetByName("All Missing Assignments")
    var protections = ss2.getProtections(SpreadsheetApp.ProtectionType.SHEET)
    console.log(protections)
    for (var i = 0; i<editors.length;i++) {
      file.addEditor(editors[i])
    }
    for (var i = 0; i<viewers.length;i++) {
      file.addViewer(viewers[i])
    }
    for (var i = 0; i < protections.length; i++) {
      var protection = protections[i];
      for (i=0; i<editors.length;i++){
        protection.addEditor(editors[i])
    }
  }
    }
  
 // move file back out
  
  var sourceFileId = 'zAlUJg_12zXxPwdGwqaaPljhdO2cxw';
  var destinationFolderId = "zAlUJg_12zXxPwdGwqaaPljhdO2cxw";
  
  var file = DriveApp.getFileById(sourceFileId);
  DriveApp.getFolderById(destinationFolderId).addFile(file);
  file
  .getParents()
  .next()
  .removeFile(file);
}


function makeCopies() {

  // move file in
  var sourceFileId = 'zAlUJg_12zXxPwdGwqaaPljhdO2cxw';
  var destinationFolderId = "zAlUJg_12zXxPwdGwqaaPljhdO2cxw";
  
  var file = DriveApp.getFileById(sourceFileId);
  DriveApp.getFolderById(destinationFolderId).addFile(file);
  file
  .getParents()
  .next()
  .removeFile(file);
  
  
  // make copies
  var currentSheet = SpreadsheetApp.getActive().getSheetByName('Sheet1')
  var currentRange = currentSheet.getRange(2,1,150,1).getValues()
  var newList = []
  for (i=0;i<currentRange.length;i++){
    if (currentRange[i]!=""){
      newList.push(currentRange[i])
    }
    }
  var editors = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').getEditors();
  var viewers = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').getViewers();
  console.log(newList)
  for (i=0;i<newList.length;i++){
    var file = DriveApp.getFileById('zAlUJg_12zXxPwdGwqaaPljhdO2cxw').makeCopy();
    var fileId = file.getId()
    var name = file.setName(newList[i])
    console.log(newList[i])
  }

// give access to users  
  var folder = DriveApp.getFolderById("zAlUJg_12zXxPwdGwqaaPljhdO2cxw");
  var filesIterator = folder.getFiles();
  while(filesIterator.hasNext()){
    var file = filesIterator.next();
    var ssID = file.getId()
    var name = file.getName()
    console.log(name)
    var ss2 = SpreadsheetApp.openById(ssID).getSheetByName("All Missing Assignments")
    var protections = ss2.getProtections(SpreadsheetApp.ProtectionType.SHEET)
    console.log(protections)
    for (var i = 0; i<editors.length;i++) {
      file.addEditor(editors[i])
    }
    for (var i = 0; i<viewers.length;i++) {
      file.addViewer(viewers[i])
    }
    for (var i = 0; i < protections.length; i++) {
      var protection = protections[i];
      for (i=0; i<editors.length;i++){
        protection.addEditor(editors[i])
    }
  }
    }
  
 // move file back out
  
  var sourceFileId = 'zAlUJg_12zXxPwdGwqaaPljhdO2cxw';
  var destinationFolderId = "zAlUJg_12zXxPwdGwqaaPljhdO2cxw";
  
  var file = DriveApp.getFileById(sourceFileId);
  DriveApp.getFolderById(destinationFolderId).addFile(file);
  file
  .getParents()
  .next()
  .removeFile(file);
}
