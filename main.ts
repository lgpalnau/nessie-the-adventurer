controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let nessie: Sprite = null
    nessie.vy = -300
})
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
animation.runMovementAnimation(
mySprite,
animation.animationPresets(animation.shake),
1000,
true
)
