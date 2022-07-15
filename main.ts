controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    mySprite.vy = -300
})
let mySprite : Sprite = null
let myEnemySprite : Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`
    level1
`)
music.setVolume(29)
music.playMelody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image`
    myImage
`, SpriteKind.Player)
myEnemySprite = sprites.create(assets.image`
    Nega Nessie
`, SpriteKind.Enemy)
myEnemySprite.say("LETS DO GREAT WORK!!!")
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 155))
tiles.placeOnTile(myEnemySprite, tiles.getTileLocation(5, 157))
