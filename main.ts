controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    nessie.vy = -300
})
let nessie: Sprite = null
scene.setBackgroundColor(9)
tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(img`
    ..............................
    ..............................
    ..............................
    ................fffffff.......
    ...............ff77777ff......
    ..............ff7777777ff.....
    ..............f771f77777f.....
    ..............f77ff77777f.....
    ..............f777771117f.....
    ..............f777711111f.....
    ..............f777111111f.....
    ..............ff7711111ff.....
    ...............f7711111f......
    ...............f7711111f......
    ...............f7711111f......
    ..............ff7711111f......
    ............fff77711111f......
    ........fffff7777111111f......
    ......fff77777777111111f......
    .....ff7777777771111111f......
    ....ff77777777771111111ff.....
    ...ff7777777777711111111ff....
    ...f777777777711111111111ff...
    ..ff7777777777111111111117ff..
    ..f777711f77711111111111177ff.
    ..f771111f777111111111111177f.
    ..f711ffff771111111111111117f.
    ..fffff.f7771fff1111111fff17f.
    ........f7711f.fff11111f.ffff.
    ........ffffff...fffffff......
    `, SpriteKind.Player)
animation.runMovementAnimation(
mySprite,
animation.animationPresets(animation.bobbing),
1000,
true
)
