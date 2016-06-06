function createArrayx2( rows, cols, defaultValue){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < rows; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(cols));

      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = defaultValue;
      }
  }

return arr;
}


function randnum(min,max){
  return(min + Math.round(Math.random()*(max-min)));
}

function arraycompare(a1,a2){ 
  var count = 0;
  for(i=0;i<a1.length;i++){
    for(j=0;j<a1.length;j++){
      if(a1[i][j]!=a2[i][j]){
        count++;
      }
    }
  }
  if(count!=0){
    return false;
  }
  else{
    return true;
  }
}


function arraycopy(from,to){
  for(i=0;i<from.length;i++){
    for(j=0;j<from.length;j++){
      to[i][j]=from[i][j];
    }
  }
}