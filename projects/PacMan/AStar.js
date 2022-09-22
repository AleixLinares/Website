let start = null; //starting grid point
let end; // ending grid point (goal)
let behind;
let openSet = []; //array containing unevaluated grid points
let closedSet = []; //array containing completely evaluated grid points
let path = [];
let cellDetails=[]

class openListCell{
  constructor(f, i, j) {
    this.f = f
    this.i = i
    this.j = j 
  }	
} 


function isValid(row, col)
{
    // Returns true if row number and column number
    // is in range
    return (row >= 0) && (row < sizeY) && (col >= 0)
           && (col < sizeX);
}
 
// A Utility Function to check whether the given cell is
// blocked or not
function isUnBlocked(row, col)
{
    // Returns true if the cell is not blocked else false
    if (matrix[row][col] != 1)
        return (true);
    else
        return (false);
}
 
// A Utility Function to check whether destination cell has
// been reached or not
function isDestination(row, col)
{
    if (row==end.i && col==end.j)
        return (true);
    else
        return (false);
}

function isBehind(i,j) {
    if(behind.i==i && behind.j==j) return true
    return false
}
 
// A Utility Function to calculate the 'h' heuristics.
function calculateHValue(row, col) {
    return Math.abs(row - end.i) + Math.abs(col - end.j)
}

function AStarSearch(startLocal, endLocal, behindLocal) {
	/*start = {i:16, j:8}
	end = {i:1, j:1}	
	start = {i:1, j:1}
	end = {i:26, j:29}*/
    start=startLocal
    end=endLocal
    behind=behindLocal	
    path=[]  
    openSet = []
    if(end.i==behind.i && end.j==behind.j) return [];
 if (isValid(start.i, start.j) == false) {
      //console.log("Source is invalid");
      return [];
  }

  // If the destination is out of range
  if (isValid(end.i, end.j) == false) {
      //console.log("Destination is invalid");
      return [];
  }

  // Either the source or the destination is blocked
  if (isUnBlocked(start.i, start.j) == false || isUnBlocked(end.i, end.j) == false) {
      //console.log("Source or the destination is blocked");
      return [];
  }

  // If the destination cell is the same as source cell
  if (isDestination(start.i, start.j, end) == true) {
      //console.log("We are already at the destination");
      return [];
  }

  cellDetails = Array.from(new Array(sizeY), () => new Array(sizeX).fill(null))

  for(var i=0; i<sizeY; ++i) {
		for(var j=0; j<sizeX; ++j) {	
			cellDetails[i][j]={f:Infinity,g:Infinity,h:Infinity, parent_i:-1, parent_j:-1}
		}
	}  
  cellDetails[start.i][start.j].f = 0.0;
  cellDetails[start.i][start.j].g = 0.0;
  cellDetails[start.i][start.j].h = 0.0;
  cellDetails[start.i][start.j].parent_i = start.i;
  cellDetails[start.i][start.j].parent_j = start.j;
  
  closedSet = Array.from(new Array(sizeY), () => new Array(sizeX).fill(false))        

  olc = new openListCell(0,start.i,start.j)
  openSet.push(olc)

  var foundDest= false
  while(openSet.length!=0) {
  	var min=findSmallF()
	olcTemp = openSet[min]
	openSet.splice(min,1)

  	var i=olcTemp.i,j=olcTemp.j
  	closedSet[i][j]=true
   	var gNew, hNew, fNew;
   	if (isValid(i - 1, j) == true && !isBehind(i-1,j)) {
   			
        // If the destination cell is the same as the
        // current successor
        if (isDestination(i - 1, j) == true) {
            // Set the Parent of the destination cell
            cellDetails[i - 1][j].parent_i = i;
            cellDetails[i - 1][j].parent_j = j;
            return tracePath();
            foundDest = true;
            return;
        }
        // If the successor is already on the closed
        // list or if it is blocked, then ignore it.
        // Else do the following
        else if (closedSet[i - 1][j] == false && isUnBlocked(i - 1, j) == true) {
            gNew = cellDetails[i][j].g + 1.0;          
            hNew = calculateHValue(i - 1, j);
            fNew = gNew + hNew;


            // If it isn’t on the open list, add it to
            // the open list. Make the current square
            // the parent of this square. Record the
            // f, g, and h costs of the square cell
            //                OR
            // If it is on the open list already, check
            // to see if this path to that square is
            // better, using 'f' cost as the measure.
            if (cellDetails[i - 1][j].f == Infinity || cellDetails[i - 1][j].f > fNew) {            
            		olc = new openListCell(fNew,i-1,j) 
								openSet.push(olc)
                // Update the details of this cell
                cellDetails[i - 1][j].f = fNew;
                cellDetails[i - 1][j].g = gNew;
                cellDetails[i - 1][j].h = hNew;
                cellDetails[i - 1][j].parent_i = i;
                cellDetails[i - 1][j].parent_j = j;
            }
        }
    	}   

  	if (isValid(i + 1, j) == true && !isBehind(i+1,j)) {
  		
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i + 1, j) == true) {
          // Set the Parent of the destination cell
          cellDetails[i + 1][j].parent_i = i;
          cellDetails[i + 1][j].parent_j = j;
          return tracePath();
          foundDest = true;
          return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (closedSet[i + 1][j] == false && isUnBlocked(i + 1, j) == true) {
          gNew = cellDetails[i][j].g + 1.0;         
          hNew = calculateHValue(i + 1, j);
          fNew = gNew + hNew;
          

          // If it isn’t on the open list, add it to
          // the open list. Make the current square
          // the parent of this square. Record the
          // f, g, and h costs of the square cell
          //                OR
          // If it is on the open list already, check
          // to see if this path to that square is
          // better, using 'f' cost as the measure.
          if (cellDetails[i + 1][j].f == Infinity || cellDetails[i + 1][j].f > fNew) {
          		olc = new openListCell(fNew,i+1,j) 
							openSet.push(olc)
              // Update the details of this cell
              cellDetails[i + 1][j].f = fNew;
              cellDetails[i + 1][j].g = gNew;
              cellDetails[i + 1][j].h = hNew;
              cellDetails[i + 1][j].parent_i = i;
              cellDetails[i + 1][j].parent_j = j;
          }
      }
  	}    	
  	if (isValid(i, j - 1) == true && !isBehind(i,j-1)) {
  		
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j - 1) == true) {
          // Set the Parent of the destination cell
          cellDetails[i][j - 1].parent_i = i;
          cellDetails[i][j - 1].parent_j = j;
          return tracePath();
          foundDest = true;
          return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (closedSet[i][j - 1] == false && isUnBlocked(i, j - 1) == true) {
          gNew = cellDetails[i][j].g + 1.0;          
          hNew = calculateHValue(i, j - 1);
          fNew = gNew + hNew;
          // If it isn’t on the open list, add it to
          // the open list. Make the current square
          // the parent of this square. Record the
          // f, g, and h costs of the square cell
          //                OR
          // If it is on the open list already, check
          // to see if this path to that square is
          // better, using 'f' cost as the measure.
          if (cellDetails[i][j - 1].f == Infinity || cellDetails[i][j - 1].f > fNew) {
          		olc = new openListCell(fNew,i,j - 1) 
							openSet.push(olc)
              // Update the details of this cell
              cellDetails[i][j - 1].f = fNew;
              cellDetails[i][j - 1].g = gNew;
              cellDetails[i][j - 1].h = hNew;
              cellDetails[i][j - 1].parent_i = i;
              cellDetails[i][j - 1].parent_j = j;
          }
      }
  	}    	
 	 	if (isValid(i, j + 1) == true && !isBehind(i,j+1)) {
 	 		
      // If the destination cell is the same as the
      // current successor
      if (isDestination(i, j + 1) == true) {
          // Set the Parent of the destination cell
          cellDetails[i][j + 1].parent_i = i;
          cellDetails[i][j + 1].parent_j = j;
          return tracePath();
          foundDest = true;
          return;
      }
      // If the successor is already on the closed
      // list or if it is blocked, then ignore it.
      // Else do the following
      else if (closedSet[i][j + 1] == false && isUnBlocked(i, j + 1) == true) {
          gNew = cellDetails[i][j].g + 1.0;         
          hNew = calculateHValue(i, j + 1);
          fNew = gNew + hNew;

          // If it isn’t on the open list, add it to
          // the open list. Make the current square
          // the parent of this square. Record the
          // f, g, and h costs of the square cell
          //                OR
          // If it is on the open list already, check
          // to see if this path to that square is
          // better, using 'f' cost as the measure.
          if (cellDetails[i][j + 1].f == Infinity || cellDetails[i][j + 1].f > fNew) {
          		olc = new openListCell(fNew,i,j + 1) 
							openSet.push(olc)
              // Update the details of this cell
              cellDetails[i][j + 1].f = fNew;
              cellDetails[i][j + 1].g = gNew;
              cellDetails[i][j + 1].h = hNew;
              cellDetails[i][j + 1].parent_i = i;
              cellDetails[i][j + 1].parent_j = j;
          }
      }
  	}
  }
  //if (foundDest == false) console.log("Failed to find the Destination Cell");
 
  return [];    	
}
  
function tracePath() {

    var row = end.i;
    var col = end.j   
 
    while (!(cellDetails[row][col].parent_i == row && cellDetails[row][col].parent_j == col)) {
        //console.log(cellDetails[row][col])
        path.push([col,row])        
        var temp_row = cellDetails[row][col].parent_i;
        var temp_col = cellDetails[row][col].parent_j;
        row = temp_row;
        col = temp_col;
    }
 
    path.push([col,row])
    /*while (path.length!=0) {
        var p = path.shift();
        console.log(p[0]);
    }*/
 
    return path;
}


function findSmallF() {

	var min=0
	for(var k=0; k<openSet.length; ++k) {
		if(openSet[k].f<openSet[min].f) {						
			min=k			
		}
	}

	return min
} 