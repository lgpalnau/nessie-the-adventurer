controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -300
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    tiles.placeOnRandomTile(myEnemySprite, assets.tile`binaryMid`)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        mySprite.destroy()
        game.over(false)
    }
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    gunPickup.destroy()
    gunType = "squirt"
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 0
})
let isFacingLeft = 0
let gunPickup: Sprite = null
let myEnemySprite: Sprite = null
let mySprite: Sprite = null
let gunType = ""
game.setGameOverEffect(false, game.loseEffect)
info.setLife(3)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
music.setVolume(29)
music.playMelody("A F A B C5 G A G ", 120)
gunType = "none"
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
myEnemySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Enemy)
gunPickup = sprites.create(assets.image`Squirt Gun`, SpriteKind.Food)
tiles.placeOnTile(myEnemySprite, tiles.getTileLocation(9, 157))
myEnemySprite.follow(mySprite, 30)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 155))
tiles.placeOnRandomTile(gunPickup, assets.tile`myTile0`)
game.onUpdate(function () {
    if (isFacingLeft == 1) {
        if ("squirt" == gunType) {
            mySprite.setImage(assets.image`nessieSquirt0`)
        } else {
            mySprite.setImage(assets.image`myImage5`)
        }
    } else if ("squirt" == gunType) {
        mySprite.setImage(assets.image`nessieSquirt`)
    } else {
        mySprite.setImage(assets.image`myImage`)
    }
    info.changeScoreBy(1)
})
game.onUpdateInterval(5000, function () {
    myEnemySprite.sayText("What's our HIGHEST priority right now?")
})
game.onUpdateInterval(12000, function () {
    myEnemySprite.sayText("What's this project's STATUS?")
})
game.onUpdateInterval(8000, function () {
    myEnemySprite.sayText("LETS DO GREAT WORK!!!")
})
