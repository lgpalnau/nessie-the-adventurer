scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -400
    }
})
function initEnemy () {
    if (enemyCount == 0) {
        enemyCount += 1
        myEnemySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(myEnemySprite, assets.tile`gunPickupTile`)
        myEnemySprite.follow(mySprite, speed)
        myEnemySprite.ay = 200
        myEnemySprite.setStayInScreen(true)
    }
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprite == emails) {
        sprite.destroy(effects.spray, 500)
        incurDamage(mySprite)
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
function incurDamage (mySprite: Sprite) {
    info.changeLifeBy(-1)
    if (info.life() <= 0) {
        mySprite.destroy()
        game.over(false)
    } else {
        music.bigCrash.play()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    otherSprite2.destroy(effects.spray, 500)
    incurDamage(sprite2)
    destroyEnemy(otherSprite2)
    initEnemy()
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    gunType = "squirt"
    music.baDing.play()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 0
})
function destroyEnemy (mySprite: Sprite) {
    enemyCount += -1
    mySprite.destroy(effects.spray, 500)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    if (sprite3 != emails) {
        music.zapped.play()
        destroyEnemy(otherSprite3)
        initEnemy()
    }
})
let phrase_index = 0
let emails: Sprite = null
let projectile: Sprite = null
let isFacingLeft = 0
let myEnemySprite: Sprite = null
let mySprite: Sprite = null
let gunType = ""
let enemyCount = 0
let speed = 0
info.setLife(4)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
game.splash("Nessie the Adventurer", "Press any key to begin, how long will you survive?")
initPlayer()
music.setVolume(29)
speed = 20
enemyCount = 0
music.playMelody("A F A B C5 G A G ", 159)
gunType = "none"
let gunPickup = sprites.create(assets.image`Squirt Gun`, SpriteKind.Food)
tiles.placeOnRandomTile(gunPickup, assets.tile`gunPickupTile`)
initEnemy()
let phrases = [
"What's our HIGHEST priority right now?",
"What's this project's STATUS?",
"LETS DO GREAT WORK!!!",
"\"The THING doesn't work\""
]
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
    if (phrase_index >= phrases.length) {
        phrase_index = 0
    }
    if (speed < 70 && info.score() >= 50) {
        speed += 20
    }
})
game.onUpdateInterval(500, function () {
    info.changeScoreBy(1)
})
game.onUpdateInterval(3000, function () {
    if (myEnemySprite.vx > 0) {
        emails = sprites.createProjectileFromSprite(assets.image`gmail`, myEnemySprite, 30, 0)
    } else {
        emails = sprites.createProjectileFromSprite(assets.image`gmail`, myEnemySprite, -30, 0)
    }
})
