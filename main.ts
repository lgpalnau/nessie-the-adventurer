controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    nessie.vy = -300
})
let nessie: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Player)
animation.runMovementAnimation(
mySprite,
animation.animationPresets(animation.shake),
1000,
true
)
