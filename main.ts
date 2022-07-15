let myEnemySprite : Sprite = null
let mySprite : Sprite = null
game.setGameOverEffect(false, game.loseEffect)
info.setLife(3)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    mySprite.vy = -300
})
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
music.setVolume(29)
music.playMelody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image`
    myImage
`, SpriteKind.Player)
myEnemySprite = sprites.create(assets.image`
    Nega Nessie
`, SpriteKind.Enemy)
tiles.placeOnTile(myEnemySprite, tiles.getTileLocation(9, 157))
myEnemySprite.follow(mySprite, 30)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 155))
game.onUpdateInterval(5000, function change_text_interval() {
    myEnemySprite.sayText("What's our HIGHEST priority right now?")
})
game.onUpdateInterval(8000, function change_text_interval_2() {
    myEnemySprite.sayText("LETS DO GREAT WORK!!!")
})
game.onUpdateInterval(12000, function change_text_interval_3() {
    myEnemySprite.sayText("What's this project's STATUS?")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function my_overlap_function() {
    tiles.placeOnRandomTile(myEnemySprite, assets.tile`binaryMid`)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        mySprite.destroy()
        game.over(false)
    }
    
})
