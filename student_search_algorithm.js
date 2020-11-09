function updateList2() {

    var folder = DriveApp.getFolderById("1_aX2zX0Z1dgurmBiveNbBlmfkNdO2cxw");
    var filesIterator = folder.getFiles();
    var ssTab;
    var currentSheet = SpreadsheetApp.getActive().getSheetByName("dataCollection")
    currentSheet.getRange(2,1,200,37).clearContent()
    var studentCount = 0
    while(filesIterator.hasNext()){
      studentCount += 1
      var file = filesIterator.next();
      var url = file.getUrl()
      var id = file.getId()
      var spreadsheet = SpreadsheetApp.openById(id);
      // Current Assignments
      var sheetName2 = spreadsheet.getSheetByName("Current Assignments")
      var sheetValues2 = sheetName2.getSheetValues(4,7,8,5)
      var hasTest = []
      for (i=0;i<sheetValues2.length;i++) {
        if (sheetValues2[i][1]=="") {
          var class2=""
        }
        else {
          var class2=sheetValues2[i][1]
        }
        if (sheetValues2[i][4].toLowerCase().includes('test') || sheetValues2[i][4].toLowerCase().includes('quiz') || sheetValues2[i][4].toLowerCase().includes('exam') || sheetValues2[i][4].toLowerCase().includes('assessment') || sheetValues2[i][3].toLowerCase().includes('test') || sheetValues2[i][3].toLowerCase().includes('quiz') || sheetValues2[i][3].toLowerCase().includes('exam') || sheetValues2[i][3].toLowerCase().includes('assessment')) {
          hasTest.push([sheetValues2[i][0],class2,true]) 
        } else {
          hasTest.push([sheetValues2[i][0],class2,false]) 
        }
  
  
      }
  
      
      
      
      
      //All Missing Assignments
      var row = []
      var sheetName = spreadsheet.getSheetByName("All Missing Assignments");
      var sheetValues = sheetName.getSheetValues(2,1,150,8);
      var arrayLength = sheetValues.length; 
      var completed = 0
      var missing = 0
      var studentName = spreadsheet.getName()
      var now = Utilities.formatDate(new Date(), "PST", "MMMM-dd");
      var now2 = Utilities.formatDate(new Date(), "PST", " hh:mm a");
      var studentList = SpreadsheetApp.getActive().getSheetByName("studentList");
      var urlLink = '=hyperlink("'+url+'", "'+studentName+'")'
      studentList.getRange('C3').setValue("Last Updated: "+now+" at "+now2);
      var teacher_count = {}
      var period_teacher = {}
      var firstClass = ""
      var secondClass = ""
      var thirdClass = ""
      var fourthClass = ""
      var fifthClass = ""
      var sixthClass = ""
      var seventhClass = ""
      var eighthClass = ""
      var firstCount = ""
      var secondCount = ""
      var thirdCount = ""
      var fourthCount = ""
      var fifthCount = ""
      var sixthCount = ""
      var seventhCount = ""
      var eighthCount = ""    
      var unChecked = ""
      var missingFirst = ""
      var missingSecond = ""
      var missingThird = ""
      var missingFourth = ""
      var missingFifth = ""
      var missingSixth = ""
      var missingSeventh = ""
      var missingEighth = ""
      var upcomingFirst = ""
      var upcomingSecond = ""
      var upcomingThird = ""
      var upcomingFourth = ""
      var upcomingFifth =""
      var upcomingSixth = ""
      var upcomingSeventh = ""
      var upcomingEighth = ""
      
      
      console.log(studentName)
      
      var list1 = []
      var inList1 = {}
      
      i=0
  
      // loop through all files
      while (sheetValues[i][1]!="" || sheetValues[i][5]!=""){

        if (sheetValues[i][6]==true && sheetValues[i][7]==false) {
          var unChecked = "F"
        }
        if (list1.length == 0) {
          if (sheetValues[i][7]==false) {
            missing+=1
            if (sheetValues[i][5].toLowerCase().includes('test') || sheetValues[i][5].toLowerCase().includes('quiz') || sheetValues[i][5].toLowerCase().includes('exam') || sheetValues[i][5].toLowerCase().includes('assessment')) {
              if (sheetValues[i][5].toLowerCase().includes('survey')) {
                  list1.push([sheetValues[i][1],sheetValues[i][2],1,false])
              }
              else {
              list1.push([sheetValues[i][1],sheetValues[i][2],1,true])
              }            
            }
            else {
              list1.push([sheetValues[i][1],sheetValues[i][2],1,false])
            } 
          } else {
            completed+=1
            list1.push([sheetValues[i][1],sheetValues[i][2],0,false])
          }
        } else {
          var exists = false
          for (a=0;a<list1.length;a++){
            
            if (list1[a][0]==sheetValues[i][1]) {
              var exists = true
              if (sheetValues[i][7]==false) {
                missing+=1
                list1[a][2]+=1
                if (sheetValues[i][5].toLowerCase().includes('test') || sheetValues[i][5].toLowerCase().includes('quiz') || sheetValues[i][5].toLowerCase().includes('exam') || sheetValues[i][5].toLowerCase().includes('assessment')) {
                  if (sheetValues[i][5].toLowerCase().includes('survey')) {
                      list1[a][3]=false
                      }
                  else {
                      list1[a][3]=true
                      }
                }
                else {
                  if (list1[a][1]==""){
                  list1[a][1]=sheetValues[i][2]
                  }
                }
              } else {
                completed+=1
              }
            }
          }
          if (exists == false) {
            if (sheetValues[i][7]==false) {
              missing+=1            
              if (sheetValues[i][5].toLowerCase().includes('test') || sheetValues[i][5].toLowerCase().includes('quiz') || sheetValues[i][5].toLowerCase().includes('exam') || sheetValues[i][5].toLowerCase().includes('assessment')) {
                if (sheetValues[i][5].toLowerCase().includes('survey')) {
                    list1.push([sheetValues[i][1],sheetValues[i][2],1,false])
                  }
                else {
                  list1.push([sheetValues[i][1],sheetValues[i][2],1,true])
                }  
  
              }
              else {
                list1.push([sheetValues[i][1],sheetValues[i][2],1,false])
              }
            } else {
              completed+=1
              list1.push([sheetValues[i][1],sheetValues[i][2],0,false])
          }
          }
        }
        i+=1
      }  
      
      for (i=0;i<list1.length;i++) {
        if (list1[i][0]==1 && list1[i][2]>0) {
          firstClass = list1[i][1].slice(0,16)
          firstCount = list1[i][2]
          if (list1[i][3]==true){
            missingFirst = true
          }
        }
        else if (list1[i][0]==2 && list1[i][2]>0) {
          secondClass = list1[i][1].slice(0,16)
          secondCount = list1[i][2]
          if (list1[i][3]==true){
            missingSecond = true
          }
        }
        else if (list1[i][0]==3 && list1[i][2]>0) {
          thirdClass = list1[i][1].slice(0,16)
          thirdCount = list1[i][2]
          if (list1[i][3]==true){
            missingThird = true
          }
        }
        else if (list1[i][0]==4 && list1[i][2]>0) {
          fourthClass = list1[i][1].slice(0,16)
          fourthCount = list1[i][2]
          if (list1[i][3]==true){
            missingFourth = true
          }
        }
        else if (list1[i][0]==5 && list1[i][2]>0) {
          fifthClass = list1[i][1].slice(0,16)
          fifthCount = list1[i][2]
          if (list1[i][3]==true){
            missingFifth = true
          }
        }
        else if (list1[i][0]==6 && list1[i][2]>0) {
          sixthClass = list1[i][1].slice(0,16)
          sixthCount = list1[i][2]
          if (list1[i][3]==true){
            missingSixth = true
          }
        }
        else if (list1[i][0]==7 && list1[i][2]>0) {
          seventhClass = list1[i][1].slice(0,16)
          seventhCount = list1[i][2]
          if (list1[i][3]==true){
            missingSeventh = true
          }
        }
        else if (list1[i][0]==8 && list1[i][2]>0) {
          eighthClass = list1[i][1].slice(0,16)
          eighthCount = list1[i][2]
          if (list1[i][3]==true){
            missingEighth = true
          }
        }      
      }

      for (i=0;i<list1.length;i++) {
        inList1[list1[i][0]]=list1[i][1]
      }
      
      var index = 0
        for (i=0;i<hasTest.length;i++) {
        if (hasTest[i][2]==true){
          if (hasTest[i][0]==1){
            firstClass = hasTest[i][1].slice(0,16)
            upcomingFirst = true
          }
          else if (hasTest[i][0]==2){
            secondClass = hasTest[i][1].slice(0,16)
            upcomingSecond = true
          }
          else if (hasTest[i][0]==3){
            thirdClass = hasTest[i][1].slice(0,16)
            upcomingThird = true 
          }
          else if (hasTest[i][0]==4){
            fourthClass = hasTest[i][1].slice(0,16)
            upcomingFourth = true
          }
          else if (hasTest[i][0]==5){
            fifthClass = hasTest[i][1].slice(0,16)
            upcomingFifth = true
          }
          else if (hasTest[i][0]==6){
            sixthClass = hasTest[i][1].slice(0,16)
            upcomingSixth = true
          }
          else if (hasTest[i][0]==7){
            seventhClass = hasTest[i][1].slice(0,16)
            upcomingSeventh = true
          }
          else if (hasTest[i][0]==8){
            eighthClass = hasTest[i][1].slice(0,16)
            upcomingEighth = true
          }
        }
      }
     
      row.push(studentName,missing,completed,url,firstClass,firstCount,secondClass,secondCount,thirdClass,thirdCount,fourthClass,fourthCount,fifthClass,fifthCount,sixthClass,sixthCount,seventhClass,seventhCount,eighthClass,eighthCount,unChecked, missingFirst, missingSecond, missingThird, missingFourth, missingFifth, missingSixth, missingSeventh, missingEighth, upcomingFirst, upcomingSecond, upcomingThird, upcomingFourth, upcomingFifth, upcomingSixth, upcomingSeventh, upcomingEighth)
      currentSheet.appendRow(row)
  
      }
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('studentList').getRange('AV7').setValue([studentCount])
  }
  
