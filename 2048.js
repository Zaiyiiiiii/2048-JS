var G2048 = {
	new: function(){
		var play = {};
		var map = createArrayx2(4,4,0);
		var score = 0;
		play.initialize = function(){			
			play.displayinit();
			clear(map,0);
			$("#2048").swipe( {
    			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
						console.log(direction);
						var tempa = createArrayx2(4,4,0);
						arraycopy(map,tempa);
						textdisplay(map);
						textdisplay(tempa);
						play.rotate(direction);
						play.combine();
						play.rerotate(direction);
						textdisplay(map);
						textdisplay(tempa);						
						if(!arraycompare(map,tempa)){
							play.fill();
						}
    			},threhold:50
  			});
			play.fill();
		}
		clear = function(mapx,value){
			for(var i in mapx){
				for(var j in mapx[i]){
					mapx[i][j]=value;
				}
			}
		}
		play.fill = function(){
			var i=randnum(0,3);
			var j=randnum(0,3);
			if(map[i][j]==0){
				map[i][j]=2;
			}
			else{
				play.fill();
			}
		}
		play.displayinit = function(){
			canvas = $("#2048");
			context = canvas.get(0).getContext("2d");
			canvasw = 1080;
			canvash = 1920;
			var Shape = function(x,y,w,h,color,text,composite){
				this.x = x;
				this.y = y;
				this.width = w;
				this.height = h;
				this.color = color;
				this.text = text;
				this.composite = composite;
			}
			font = "helvetica";
			fontcolor = "rgba(255,255,255,1)";
			ifnum = /^[0-9]*$/;
			boxnum = 4;
			space = 25;
			boxwidth = (canvasw-space*(boxnum+1))/boxnum;
			shapes = new Array();
			
			for(i=0;i<boxnum;i++){
				for (j=0;j<boxnum;j++){
					shapes.push(new Shape(space+j*(space+boxwidth),space+i*(space+boxwidth),boxwidth,boxwidth,"rgba(255,0,0,0.7)",i*4+j,"source-over"));
				}
			}
			shapes.push(new Shape(0,0,canvasw,canvash,"rgba(252,219,69,0.5)","dd","destination-over"));	
			shapes.push(new Shape(80,1100,800,200,"rgba(252,219,69,0.5)",score,"source-over"));			
		}
		play.display = function(){
			context.clearRect(0,0,canvasw,canvash);
			for(n in shapes){
				var nowShape = shapes[n];					
				context.fillStyle = nowShape.color;
				context.globalCompositeOperation = nowShape.composite;
				
				context.fillRect(nowShape.x,nowShape.y,nowShape.width,nowShape.height);
				if(ifnum.test(nowShape.text)&&n<16){
					nowShape.text=map[Math.floor(n/4)][n%4];
					if(nowShape.text!=0){
					textbits =	Math.floor(Math.log(nowShape.text)/Math.log(10))+1;
					context.font = (100/textbits+100)+"px helvetica";
					context.fillStyle = fontcolor;
					context.fillText(nowShape.text,nowShape.x+boxwidth*0.3-(textbits-1)*40,nowShape.y+0.8*boxwidth-(textbits-1)*16);
					}
				}
				if(n==17){
					nowShape.text = score;
					context.fillStyle = fontcolor;					
					context.font = "200px helvetica";
					context.fillText(nowShape.text,nowShape.x+50,nowShape.y+165);
				}
			}
			
		}
		play.rclock = function(){
			var temp = createArrayx2(4,4,0);
			for(i in temp){
				for(j in temp[i]){
					temp[i][j] = map[j][3-i];
				}					
			}
			map = temp;
		}
		play.clock = function(){
			var temp = createArrayx2(4,4,0);
			for(i in temp){
				for(j in temp[i]){
					temp[i][j] = map[3-j][i];
				}					
			}
			map = temp;
		}
		play.mirror = function(){
			for(i in map){
				map[i]=map[i].reverse();
			}
		}
		play.rotate = function(dirc){
			switch(dirc){
				case "up": play.rclock(); break;
				case "down": play.clock(); break;
				case "right": play.mirror(); break;
			}
		}
		play.combine = function(){	
			for(a in map){
				var ctemp = map[a];
				for(var i=0;i<4;i++){
					for(m in ctemp){
						if(ctemp[m]==0){
							ctemp.splice(m,1);
						}
					}
				}
				for(var i=0;i<ctemp.length;i++){
					if(ctemp[i]==ctemp[i+1]){
						score+=ctemp[i];
						ctemp[i]*=2;
						ctemp[i+1]=0;
						console.log("boom");
					};
				}
				for(var i=0;i<4;i++){
					for(m in ctemp){
						if(ctemp[m]==0){
							ctemp.splice(m,1);
						}
					}
				}
				l = ctemp.length;
				for(i=0;i<(4-l);i++){
					ctemp.push(0);
				}
				map[a]=ctemp;
			}
		}
		play.rerotate = function(dirc){
			switch(dirc){
				case "up": play.clock(); break;
				case "down": play.rclock(); break;
				case "right": play.mirror(); break;
			}
		}
		textdisplay = function(mapx){
			var text="";
			for(var i in mapx){
				for(var j in mapx[i]){
					text += "["+mapx[i][j]+"]";
				}
				text += "\n";
			}
			console.log(text);
		}
		loop = function(){
			console.log("loop");			
			play.display();
			setTimeout('loop()',33);
		}
		play.start = function(){
			play.initialize();
			loop();
		}
		return play;
	}
}