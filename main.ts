controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -300
})
let mySprite: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
music.setVolume(29)
music.playMelody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
mySprite.setStayInScreen(true)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 1))
