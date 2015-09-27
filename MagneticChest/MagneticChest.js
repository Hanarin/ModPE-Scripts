//import java.lang.*
var Runnable = java.lang.Runnable;
var Thread = java.lang.Thread;

var chunk = new Array();
var chestPosition = new Array();
var thread;

function ChunkPosition(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
ChunkPosition.prototype = {
  toString : function() {
    return "[" + this.x + "," + this.y + "," + this.z + "]";
  }
  getX : function() {
    return this.x;
  }
  getY : function() {
    return this.y;
  }
  getZ : function() {
    return this.z;
  }
}

function checkChunk(x, y, z) {
  for(var i in chunk) {
    if(("[" + x/16 + "," + y/8 + "," + z/16 + "]").equals(chunk[i])) {
      return;
    }
  }
  chunk.push(new ChunkPosition(x/16,y/8,z/16));
}

function newLevel(hasLevel) {
  thread = new Thread(new Runnable( {
    run:function() {
      try{
        while(! thread.isInterrupted()) {
          Thread.sleep(200);
          var px = Player.getX();
          var py = Player.getY();
          var pz = Player.getZ();
          checkChunk(px, py, pz);
        }
      }catch(e) {}
    }
  }));
}

function leaveGame() {
  if(! thread.isInterrupted()) {
    thread.interrupt();
  }
}
