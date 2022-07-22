namespace SpriteKind {
    export const Friend = SpriteKind.create()
    export const Coin = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite2, otherSprite) {
    otherSprite.destroy()
    music.powerUp.play()
    info.changeScoreBy(100)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    if (mySprite3.isHittingTile(CollisionDirection.Bottom)) {
        mySprite3.vy = -400
    }
})
function initEnemy () {
    if (enemyCount == 0) {
        enemyCount += 1
        myEnemySprite = sprites.create(assets.image`Nega Nessie`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(myEnemySprite, assets.tile`gunPickupTile`)
        myEnemySprite.follow(mySprite3, speed)
        myEnemySprite.ay = 200
        myEnemySprite.setStayInScreen(true)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if ("squirt" == gunType) {
        music.pewPew.play()
        if (1 == isFacingLeft) {
            projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite3, -200, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(assets.image`projectile`, mySprite3, 200, 0)
        }
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite3, otherSprite2) {
    if (sprite3 == emails) {
        sprite3.destroy(effects.spray, 500)
        incurDamage(mySprite3)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite3.isHittingTile(CollisionDirection.Bottom)) {
        mySprite3.vy = -300
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite32, otherSprite32) {
    if (sprite32 != emails) {
        music.zapped.play()
        destroyEnemy(otherSprite32)
        initEnemy()
    }
})
function spawnCoins (cointCount: number) {
    let randomTile: any;
for (let index = 0; index < cointCount; index++) {
        coinSprite = sprites.create(img`
            . . . . . . b b b b . . . . . . 
            . . . . . . b 4 4 4 b . . . . . 
            . . . . . . b b 4 4 4 b . . . . 
            . . . . . b 4 b b b 4 4 b . . . 
            . . . . b d 5 5 5 4 b 4 4 b . . 
            . . . . b 3 2 3 5 5 4 e 4 4 b . 
            . . . b d 2 2 2 5 7 5 4 e 4 4 e 
            . . . b 5 3 2 3 5 5 5 5 e e e e 
            . . b d 7 5 5 5 3 2 3 5 5 e e e 
            . . b 5 5 5 5 5 2 2 2 5 5 d e e 
            . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
            . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
            b d 3 2 d 5 5 5 d d d 4 4 . . . 
            b 5 5 5 5 d d 4 4 4 4 . . . . . 
            4 d d d 4 4 4 . . . . . . . . . 
            4 4 4 4 . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        randomTile = Math.pickRandom(coinSpawns)
coinSpawns.removeElement(randomTile)
tiles.placeOnTile(coinSprite, randomTile)
        coinSprite.y = coinSprite.y - 35
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 1
})
function initPlayer () {
    mySprite3 = sprites.create(assets.image`myImage`, SpriteKind.Player)
    tiles.placeOnTile(mySprite3, tiles.getTileLocation(3, 155))
    mySprite3.setStayInScreen(true)
    scene.cameraFollowSprite(mySprite3)
    controller.moveSprite(mySprite3, 100, 0)
    mySprite3.ay = 500
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    isFacingLeft = 0
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite4, otherSprite3) {
    sprite4.destroy()
    if (sprite4 == gunPickup) {
        gunType = "squirt"
        music.baDing.play()
    } else {
        music.powerUp.play()
        info.changeLifeBy(1)
        info.changeScoreBy(1500)
    }
})
function dropWeapon () {
    gunPickup = sprites.create(assets.image`Squirt Gun`, SpriteKind.Food)
    tiles.placeOnRandomTile(gunPickup, assets.tile`gunPickupTile`)
}
function destroyEnemy (mySprite2: Sprite) {
    enemyCount += -1
    mySprite2.destroy(effects.spray, 200)
}
function spawnThug () {
    thugSprite = sprites.create(assets.image`myImage4`, SpriteKind.Friend)
    tiles.placeOnRandomTile(thugSprite, assets.tile`thugSpawn`)
    thugSprite.sayText("Sup homie")
}
function dropLife () {
    mySprite22 = sprites.create(assets.image`chip`, SpriteKind.Food)
    tiles.placeOnRandomTile(mySprite22, assets.tile`extraLife`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite22, otherSprite22) {
    otherSprite22.destroy(effects.spray, 500)
    incurDamage(sprite22)
    destroyEnemy(otherSprite22)
    initEnemy()
})
let phrase_index = 0
let mySprite22: Sprite = null
let thugSprite: Sprite = null
let gunPickup: Sprite = null
let coinSprite: Sprite = null
let emails: Sprite = null
let projectile: Sprite = null
let isFacingLeft = 0
let myEnemySprite: Sprite = null
let mySprite3: Sprite = null
let gunType = ""
let enemyCount = 0
let speed = 0
let coinSpawns : tiles.Location[] = []
info.setLife(4)
scene.setBackgroundColor(13)
tiles.setCurrentTilemap(tilemap`level1`)
music.playMelody("A F A B C5 G A G ", 159)
game.splash("Nessie the Adventurer", "Press any key to begin, how long will you survive?")
initPlayer()
music.setVolume(29)
speed = 20
enemyCount = 0
gunType = "none"
coinSpawns = tiles.getTilesByType(assets.tile`binaryBottom`)
dropWeapon()
dropWeapon()
dropLife()
dropLife()
initEnemy()
spawnCoins(20)
spawnThug()
let phrases = [
"What's our HIGHEST priority right now?",
"What's this project's STATUS?",
"What am I'm doing",
"The THING doesn't work",
"It works on my machine",
"I have no idea what this code does",
"I'm going too slow"
]
game.onUpdate(function () {
    if (isFacingLeft == 1) {
        if ("squirt" == gunType) {
            mySprite3.setImage(assets.image`nessieSquirt0`)
        } else {
            mySprite3.setImage(assets.image`myImage5`)
        }
    } else if ("squirt" == gunType) {
        mySprite3.setImage(assets.image`nessieSquirt`)
    } else {
        mySprite3.setImage(assets.image`myImage`)
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
