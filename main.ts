controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -300
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 1
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(myEnemySprite, assets.tile`binaryMid`)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        mySprite.destroy()
        game.over(false)
    }
})
let isFacingLeft = 0
let myEnemySprite: Sprite = null
let mySprite: Sprite = null
game.setGameOverEffect(false, game.loseEffect)
info.setLife(3)
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
music.setVolume(29)
music.playMelody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
myEnemySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Enemy)
tiles.placeOnTile(myEnemySprite, tiles.getTileLocation(9, 157))
myEnemySprite.follow(mySprite, 30)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 155))
game.onUpdate(function () {
    if (isFacingLeft == 1) {
        mySprite.setImage(assets.image`myImage4`)
    } else {
        mySprite.setImage(assets.image`myImage`)
    }
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
