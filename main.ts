function initEnemy () {
    myEnemySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(myEnemySprite, assets.tile`gunPickupTile`)
    myEnemySprite.follow(mySprite, speed)
    myEnemySprite.ay = 30
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if ("squirt" == gunType) {
        music.pewPew.play()
        if (1 == isFacingLeft) {
            projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite, -200, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite, 200, 0)
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -300
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 1
})
function initPlayer () {
    mySprite = sprites.create(assets.image`myImage`, SpriteKind.Player)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(3, 155))
    mySprite.setStayInScreen(true)
    scene.cameraFollowSprite(mySprite)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    music.bigCrash.play()
    tiles.placeOnRandomTile(myEnemySprite, assets.tile`binaryMid`)
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        mySprite.destroy()
        game.over(false)
    } else {
        music.powerDown.play()
    }
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    gunPickup.destroy()
    gunType = "squirt"
    music.baDing.play()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 0
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    music.zapped.play()
    myEnemySprite.destroy(effects.spray, 500)
    initEnemy()
})
let phrase_index = 0
let projectile: Sprite = null
let isFacingLeft = 0
let mySprite: Sprite = null
let myEnemySprite: Sprite = null
let gunPickup: Sprite = null
let gunType = ""
let speed = 0
info.setLife(4)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
initPlayer()
music.setVolume(29)
speed = 30
music.playMelody("A F A B C5 G A G ", 159)
gunType = "none"
gunPickup = sprites.create(assets.image`Squirt Gun`, SpriteKind.Food)
tiles.placeOnRandomTile(gunPickup, assets.tile`gunPickupTile`)
initEnemy()
let phrases = ["What's our HIGHEST priority right now?", "What's this project's STATUS?", "LETS DO GREAT WORK!!!"]
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
    if (myEnemySprite.vx > 0) {
        myEnemySprite.setImage(assets.image`Nega Nessie`)
    } else {
        myEnemySprite.setImage(assets.image`Left Nega Nessie`)
    }
})
game.onUpdateInterval(5000, function () {
    myEnemySprite.sayText(phrases[phrase_index])
    phrase_index += 1
    if (phrase_index > phrases.length) {
        phrase_index = 0
    }
    if (speed < 70 && info.score() >= 50) {
        speed = speed + 20
    }
})
game.onUpdateInterval(500, function () {
    info.changeScoreBy(1)
})
