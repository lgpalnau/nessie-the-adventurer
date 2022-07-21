@namespace
class SpriteKind:
    Friend = SpriteKind.create()
    Coin = SpriteKind.create()

def on_overlap_tile(sprite, location):
    if mySprite3.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite3.vy = -400
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
    """),
    on_overlap_tile)

def initEnemy():
    global enemyCount, myEnemySprite
    if enemyCount == 0:
        enemyCount += 1
        myEnemySprite = sprites.create(assets.image("""
            Nega Nessie
        """), SpriteKind.enemy)
        tiles.place_on_random_tile(myEnemySprite, assets.tile("""
            gunPickupTile
        """))
        myEnemySprite.follow(mySprite3, speed)
        myEnemySprite.ay = 200
        myEnemySprite.set_stay_in_screen(True)

def on_on_overlap(sprite2, otherSprite):
    otherSprite.destroy()
    info.change_score_by(100)
sprites.on_overlap(SpriteKind.player, SpriteKind.Coin, on_on_overlap)

def on_b_pressed():
    global projectile
    if "squirt" == gunType:
        music.pew_pew.play()
        if 1 == isFacingLeft:
            projectile = sprites.create_projectile_from_sprite(assets.image("""
                projectile
            """), mySprite3, -200, 0)
        else:
            projectile = sprites.create_projectile_from_sprite(assets.image("""
                projectile
            """), mySprite3, 200, 0)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if mySprite3.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite3.vy = -300
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap2(sprite3, otherSprite2):
    if sprite3 == emails:
        sprite3.destroy(effects.spray, 500)
        incurDamage(mySprite3)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.player, on_on_overlap2)

def spawnCoins(cointCount: number):
    global coinSprite
    for index in range(cointCount):
        coinSprite = sprites.create(img("""
                . . b b b b . . 
                            . b 5 5 5 5 b . 
                            b 5 d 3 3 d 5 b 
                            b 5 3 5 5 1 5 b 
                            c 5 3 5 5 1 d c 
                            c d d 1 1 d d c 
                            . f d d d d f . 
                            . . f f f f . .
            """),
            SpriteKind.Coin)
        tiles.place_on_tile(coinSprite, coinSpawns.pop())
        coinSprite.y = coinSprite.y - 16

def on_left_pressed():
    global isFacingLeft
    isFacingLeft = 1
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def initPlayer():
    global mySprite3
    mySprite3 = sprites.create(assets.image("""
        myImage
    """), SpriteKind.player)
    tiles.place_on_tile(mySprite3, tiles.get_tile_location(3, 155))
    mySprite3.set_stay_in_screen(True)
    scene.camera_follow_sprite(mySprite3)
    controller.move_sprite(mySprite3, 100, 0)
    mySprite3.ay = 500
def incurDamage(mySprite: Sprite):
    info.change_life_by(-1)
    if info.life() <= 0:
        mySprite.destroy()
        game.over(False)
    else:
        music.big_crash.play()

def on_on_overlap3(sprite22, otherSprite22):
    otherSprite22.destroy(effects.spray, 500)
    incurDamage(sprite22)
    destroyEnemy(otherSprite22)
    initEnemy()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

def on_on_overlap4(sprite4, otherSprite3):
    global gunType
    sprite4.destroy()
    if sprite4 == gunPickup:
        gunType = "squirt"
        music.ba_ding.play()
    else:
        music.power_up.play()
        info.change_life_by(1)
        info.change_score_by(1500)
sprites.on_overlap(SpriteKind.food, SpriteKind.player, on_on_overlap4)

def on_right_pressed():
    global isFacingLeft
    isFacingLeft = 0
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def dropWeapon():
    global gunPickup
    gunPickup = sprites.create(assets.image("""
        Squirt Gun
    """), SpriteKind.food)
    tiles.place_on_random_tile(gunPickup, assets.tile("""
        gunPickupTile
    """))
def destroyEnemy(mySprite2: Sprite):
    global enemyCount
    enemyCount += -1
    mySprite2.destroy(effects.spray, 200)
def spawnThug():
    global thugSprite
    thugSprite = sprites.create(assets.image("""
        myImage4
    """), SpriteKind.Friend)
    tiles.place_on_random_tile(thugSprite, assets.tile("""
        thugSpawn
    """))
    thugSprite.say_text("Sup homie")
def dropLife():
    global mySprite22
    mySprite22 = sprites.create(assets.image("""
        chip
    """), SpriteKind.food)
    tiles.place_on_random_tile(mySprite22, assets.tile("""
        extraLife
    """))

def on_on_overlap5(sprite32, otherSprite32):
    if sprite32 != emails:
        music.zapped.play()
        destroyEnemy(otherSprite32)
        initEnemy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap5)

phrase_index = 0
mySprite22: Sprite = None
thugSprite: Sprite = None
gunPickup: Sprite = None
coinSprite: Sprite = None
emails: Sprite = None
projectile: Sprite = None
isFacingLeft = 0
myEnemySprite: Sprite = None
mySprite3: Sprite = None
coinSpawns: List[tiles.Location] = []
gunType = ""
enemyCount = 0
speed = 0
info.set_life(4)
scene.set_background_color(13)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
music.play_melody("A F A B C5 G A G ", 159)
game.splash("Nessie the Adventurer",
    "Press any key to begin, how long will you survive?")
initPlayer()
music.set_volume(29)
speed = 20
enemyCount = 0
gunType = "none"
coinSpawns = tiles.get_tiles_by_type(assets.tile("""
    binaryMid
"""))
dropWeapon()
dropWeapon()
dropLife()
dropLife()
initEnemy()
spawnCoins(100)
spawnThug()
phrases = ["What's our HIGHEST priority right now?",
    "What's this project's STATUS?",
    "What am I'm doing",
    "The THING doesn't work",
    "It works on my machine",
    "I have no idea what this code does",
    "I'm going too slow"]

def on_on_update():
    if isFacingLeft == 1:
        if "squirt" == gunType:
            mySprite3.set_image(assets.image("""
                nessieSquirt0
            """))
        else:
            mySprite3.set_image(assets.image("""
                myImage5
            """))
    elif "squirt" == gunType:
        mySprite3.set_image(assets.image("""
            nessieSquirt
        """))
    else:
        mySprite3.set_image(assets.image("""
            myImage
        """))
    if myEnemySprite.vx > 0:
        myEnemySprite.set_image(assets.image("""
            Nega Nessie
        """))
    else:
        myEnemySprite.set_image(assets.image("""
            Left Nega Nessie
        """))
game.on_update(on_on_update)

def on_update_interval():
    global phrase_index, speed
    myEnemySprite.say_text(phrases[phrase_index])
    phrase_index += 1
    if phrase_index >= len(phrases):
        phrase_index = 0
    if speed < 70 and info.score() >= 50:
        speed += 20
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    info.change_score_by(1)
game.on_update_interval(500, on_update_interval2)

def on_update_interval3():
    global emails
    if myEnemySprite.vx > 0:
        emails = sprites.create_projectile_from_sprite(assets.image("""
            gmail
        """), myEnemySprite, 30, 0)
    else:
        emails = sprites.create_projectile_from_sprite(assets.image("""
            gmail
        """), myEnemySprite, -30, 0)
game.on_update_interval(3000, on_update_interval3)
