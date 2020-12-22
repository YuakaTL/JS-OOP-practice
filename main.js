
// var Game = function () {
//     this.timer = null
//     this.initControl()
//     this.control = {}
//     this.grade = 0
// }
//開始遊戲倒數
// Game.prototype.startGame = function () {
//     let time = 3
//     let _this = this
//     $("button").hide()
//     ball.init()
//     $(".infoText").text("Ready")
//     this.timer = setInterval(function () {
//         $(".infoText").text(time)
//         if (time <= 0) {
//             $(".info").hide()
//             clearInterval(_this.timer)
//             _this.startGameMain()
//         }
//         time--
//     }, 1000)
// }
//設置鍵盤控制
// Game.prototype.initControl = function () {
//     let _this = this
//     $(window).keydown(function (evt) {
//         _this.control[evt.key] = true
//     })
//     $(window).keyup(function (evt) {
//         _this.control[evt.key] = false
//     })
// }
//主要遊戲的迴圈
// Game.prototype.startGameMain = function () {
//     let _this = this
//     this.timer = setInterval(function () {
//         if (board1.collide(ball)) {
//             console.log("Hit Board 1!")
//             ball.velocity.y = Math.abs(ball.velocity.y)
//             ball.velocity.x *= 1.1
//             ball.velocity.y *= 1.1
//             ball.velocity.x += 0.5 - Math.random()
//             ball.velocity.y += 0.5 - Math.random()
//         }
//         if (board2.collide(ball)) {
//             console.log("Hit Board 2!")
//             ball.velocity.y = -Math.abs(ball.velocity.y)
//             _this.grade += 10
//         }
//         if (ball.position.y <= 0) {
//             _this.endGame("Computer lose")
//         }
//         if (ball.position.y >= 500) {
//             _this.endGame("You lose")
//         }
//         if (_this.control["ArrowLeft"]) {
//             board2.position.x -= 8
//         }
//         if (_this.control["ArrowRight"]) {
//             board2.position.x += 8
//         }

//         //自動移動的對手
//         board1.position.x += ball.position.x > board1.position.x + board1.size.width / 2 + 5 ? 8 : 0
//         board1.position.x += ball.position.x < board1.position.x + board1.size.width / 2 - 5 ? -8 : 0

//         ball.update()
//         board1.update()
//         board2.update()

//         $(".grade").text(_this.grade)

//     }, 30)
// }
//遊戲結束
// Game.prototype.endGame = function (result) {
//     clearInterval(this.timer)
//     $(".info").show()
//     $("button").show()
//     $(".infoText").html(result + "<br>Score: " + this.grade)
//     this.grade = 0
// }
//建立遊戲物件
// var game = new Game()