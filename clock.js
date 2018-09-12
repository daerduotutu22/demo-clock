
(function(){
    var Clock = function(obj){
        this.canvas = obj.canvas;
        this.width = obj.canvas.offsetWidth;
        this.height = obj.canvas.offsetHeight;
        this.r = this.width / 2;
        this.ctx = this.canvas.getContext("2d");
        this.dotcircle = 60; /*小圆点*/
        this.text = [3,4,5,6,7,8,9,10,11,12,1,2];
        this.start();

    };
    Clock.prototype.start = function(){
        var date = new Date();
        var me = this;
        var hour, minute,second;
        hour = date.getHours();
        minute = date.getMinutes();
        second = date.getSeconds();
        this.update(hour,minute,second);
        // setInterval(this.start,1000)   //错误 进入setinterval后this变成window
        // setInterval(this.start.bind(this),1000);   //第一种正确解法  
        setInterval(function(){ //第二种解法
            me.start();
        },1000);
    }
    Clock.prototype.update = function(hour,minute,second){
        this.ctx.clearRect(0,0,this.width,this.height);
        this.drawbg();
        this.drawdotcircle();
        this.drawtext();
        this.drawhourline(hour,minute);
        this.drawminuteline(minute);
        this.drawsecondline(second);
        this.drawcenterdot();
        this.ctx.restore();

    };
    Clock.prototype.drawbg = function(){
        var ctx = this.ctx;
        ctx.lineWidth = 10;
        r = this.r - ctx.lineWidth;
        ctx.save();
        ctx.translate(this.r,this.r); //将画布的原点移到最中心的点
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2*Math.PI);
        ctx.closePath();
        ctx.stroke();
    };
    Clock.prototype.drawdotcircle = function(){
        var ctx = this.ctx;
        ctx.save();
        var dotrad = 2 * Math.PI / 60; // 每个刻度的弧度
        var r = this.r - 20 ; //当前计算位置的半径
        var x,y
        for(var i=0;i<this.dotcircle;i++){
            var rad = dotrad * i; //获得当前弧度
            x = r * Math.sin(rad);
            y = r * Math.cos(rad);
            ctx.beginPath();
            if(i%5==0){
                ctx.arc(x, y, 4, 0, 2*Math.PI);
            }else{
                ctx.arc(x, y, 2, 0, 2*Math.PI);
            }
            ctx.closePath();
            ctx.fillStyle = 'gray';
            ctx.fill();
        }
        ctx.restore();
    }
    Clock.prototype.drawtext = function(){
        var ctx = this.ctx;
        
        var textrad = 2 * Math.PI / 12;
        var r = this.r - 20 - 20;
        var x,y
        for(var i=0;i<this.text.length;i++){
            var rad = textrad * i; //获得当前弧度
            x = r * Math.cos(rad);
            y = r * Math.sin(rad);
            ctx.font = '16px Arial'
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle";
            ctx.fillText(this.text[i], x, y);

        }
    }
    // obj{
    //  rad 当前针所在的弧度
    // style 颜色
    // width 宽度
    // length 长度
    // }

    // 将线画到纵坐标的上面（ 朝下时正的 所以加负）再旋转相应的度数
    Clock.prototype.drawline = function(rad,style, width, length){
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();

        ctx.rotate(rad);
        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = style;
        ctx.moveTo(0,20);
        ctx.lineTo(0,-length);

        ctx.closePath();
        ctx.stroke();
        ctx.restore();


        
    }
    Clock.prototype.drawhourline = function(hour, minute){
      var rad , cellrad;
      cellrad = 2 * Math.PI / this.text.length;

    //   时针当前指的相对于12点时候的角度
      rad = cellrad * hour + minute/60 * cellrad;


      this.drawline(rad,'black', 5 ,this.r*0.5);  
    }
    Clock.prototype.drawminuteline = function(minute){
        var rad = minute * (2 * Math.PI /this.dotcircle);
        this.drawline(rad, 'black', 5, r*0.7);
    }
    Clock.prototype.drawsecondline = function(second){
        var rad = second * (2 * Math.PI /this.dotcircle);
        this.drawline(rad, 'red', 2, r*0.88);
    }

    Clock.prototype.drawcenterdot = function(){
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2*Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    window.Clock = Clock;
})();