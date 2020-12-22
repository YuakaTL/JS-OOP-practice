//-------[類別] 遊戲物件
var GameObject = function (position,size,selector){
    this.$el = $(selector)
    this.position = position
    this.size = size
    this.$el.css("position","absolute")
    this.updateCss()
  }
  //更新遊戲物件(資料->實際的css)
  GameObject.prototype.updateCss = function(){
    this.$el.css("left",this.position.x+"px")
    this.$el.css("top",this.position.y+"px")
    this.$el.css("width",this.size.width+"px")
    this.$el.css("height",this.size.height+"px")
  }
  //偵測遊戲物件碰撞
  GameObject.prototype.collide = function(otherObject){
    let pos = otherObject.position
    let inXrange = pos.x >= this.position.x && pos.x <= this.position.x + this.size.width
    let inYrange =  pos.y >= this.position.y && pos.y <= this.position.y + this.size.height
    return inXrange && inYrange
  }
  
  //-------[類別] 球 -- //繼承遊戲物件
  var Ball = function(){
    this.init()
    GameObject.call(this,
      this.position,
      {width: 15, height: 15},
      ".ball"
    )
  }
  Ball.prototype = Object.create(GameObject.prototype)
  Ball.prototype.constructor = Ball.constructor
  //將速度加上球的位置 / 反彈偵測 / 以及更新
  Ball.prototype.update = function(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.updateCss()
    if (this.position.x <0 || this.position.x > 500){
      this.velocity.x=-this.velocity.x
    }
    if (this.position.y <0 || this.position.y > 500){
      this.velocity.y=-this.velocity.y
    }
  } 
  Ball.prototype.init = function(){
    this.position = { x:250 , y:250 }
    var randomDeg = Math.random()*2*Math.PI
    this.velocity = {
      x: Math.cos(randomDeg)*8,
      y: Math.sin(randomDeg)*8
    }
  }
  
  //-------[類別] 板子 -- //繼承遊戲物件
  var Board = function(position,size,selector){
    GameObject.call(this,position,size,selector)
  }
  Board.prototype = Object.create(GameObject.prototype)
  Board.prototype.constructor = Board.constructor
  //檢查板子是否超出邊界與更新
  Board.prototype.update = function(){
    if (this.position.x<0){
      this.position.x = 0
    }
    if (this.position.x + this.size.width>500){
      this.position.x = 500 - this.size.width
    }
    this.updateCss()
  }
  
  var board1 = new Board(
    {x: 0,y: 30},  {width: 100,height: 15},
    ".b1"  
  )
  
  var board2 = new Board(
    {x: 0,y: 455},  {width: 100,height: 15},
    ".b2"  
  )
  
  var ball = new Ball()
  //-------[類別] 遊戲
  var Game = function (){
    this.timer = null
    this.initControl()
    this.control = {}
    this.grade=0
  }
  //開始遊戲倒數
  Game.prototype.startGame = function(){
    let time = 3
    let _this = this
    $("button").hide()
    ball.init()
    $(".infoText").text("Ready")
    this.timer = setInterval(function(){
      $(".infoText").text(time)
      if (time<=0){
        $(".info").hide()
        clearInterval( _this.timer )
        _this.startGameMain()
      }
      time--
    },1000)  
  }
  //設置鍵盤控制
  Game.prototype.initControl = function(){
    let _this = this
    $(window).keydown(function(evt){
      _this.control[evt.key]=true
    })
    $(window).keyup(function(evt){
      _this.control[evt.key]=false
    })
  }
  //主要遊戲的迴圈
  Game.prototype.startGameMain = function(){
    let _this = this
    this.timer = setInterval(function(){
      if (board1.collide(ball)){
        console.log("Hit Board 1!")
        ball.velocity.y = Math.abs(ball.velocity.y)
        ball.velocity.x*=1.1
        ball.velocity.y*=1.1
        ball.velocity.x+=0.5-Math.random()
        ball.velocity.y+=0.5-Math.random()
      }
      if (board2.collide(ball)){
        console.log("Hit Board 2!")
        ball.velocity.y = - Math.abs(ball.velocity.y)
        _this.grade+=10
      }
      if (ball.position.y<=0){
        _this.endGame("Computer lose")
      }  
      if (ball.position.y>=500){
        _this.endGame("You lose")
      }
      if (_this.control["ArrowLeft"]){
        board2.position.x-=8
      }
      if (_this.control["ArrowRight"]){
        board2.position.x+=8
      }
      
      //自動移動的對手
      board1.position.x+= ball.position.x > board1.position.x+board1.size.width/2+5? 8:0
      board1.position.x+= ball.position.x < board1.position.x+board1.size.width/2-5? -8:0
      
      ball.update()
      board1.update()
      board2.update()
      
      $(".grade").text(_this.grade)
    
    },30)  
  }
  //遊戲結束
  Game.prototype.endGame = function(result){
    clearInterval(this.timer)
    $(".info").show()
    $("button").show()
    $(".infoText").html(result+"<br>Score: "+ this.grade)
    this.grade=0
  }
  
  //建立遊戲物件
  var game = new Game()