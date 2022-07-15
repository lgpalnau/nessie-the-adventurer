def initEnemy():
    global myEnemySprite
    myEnemySprite = sprites.create(assets.image("""
        Nega Nessie
    """), SpriteKind.enemy)
    tiles.place_on_random_tile(myEnemySprite, assets.tile("""
        gunPickupTile
    """))
    myEnemySprite.follow(mySprite, speed)

def on_b_pressed():
    global projectile
    if "squirt" == gunType:
        music.pew_pew.play()
        if 1 == isFacingLeft:
            projectile = sprites.create_projectile_from_sprite(assets.image("""
                projectile
            """), mySprite, -200, 0)
        else:
            projectile = sprites.create_projectile_from_sprite(assets.image("""
                projectile
            """), mySprite, 200, 0)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -300
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global isFacingLeft
    isFacingLeft = 1
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def initPlayer():
    global mySprite
    mySprite = sprites.create(assets.image("""
        myImage
    """), SpriteKind.player)
    tiles.place_on_tile(mySprite, tiles.get_tile_location(3, 155))
    mySprite.set_stay_in_screen(True)
    scene.camera_follow_sprite(mySprite)
    controller.move_sprite(mySprite, 100, 0)
    mySprite.ay = 500

def on_on_overlap(sprite2, otherSprite2):
    tiles.place_on_random_tile(myEnemySprite, assets.tile("""
        binaryMid
    """))
    info.change_life_by(-1)
    if info.life() <= 0:
        mySprite.destroy()
        game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    global gunType
    gunPickup.destroy()
    gunType = "squirt"
sprites.on_overlap(SpriteKind.food, SpriteKind.player, on_on_overlap2)

def on_right_pressed():
    global isFacingLeft
    isFacingLeft = 0
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap3(sprite3, otherSprite3):
    myEnemySprite.destroy(effects.spray, 500)
    initEnemy()
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap3)

projectile: Sprite = None
isFacingLeft = 0
mySprite: Sprite = None
myEnemySprite: Sprite = None
gunPickup: Sprite = None
gunType = ""
speed = 0
game.set_game_over_effect(False, game.lose_effect)
info.set_life(3)
scene.set_background_color(13)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
initPlayer()
music.set_volume(29)
speed = 30
music.play_melody("A F A B C5 G A G ", 120)
gunType = "none"
gunPickup = sprites.create(assets.image("""
    Squirt Gun
"""), SpriteKind.food)
tiles.place_on_random_tile(gunPickup, assets.tile("""
    gunPickupTile
"""))
initEnemy()

def on_on_update():
    if isFacingLeft == 1:
        if "squirt" == gunType:
            mySprite.set_image(assets.image("""
                nessieSquirt0
            """))
        else:
            mySprite.set_image(assets.image("""
                myImage5
            """))
    elif "squirt" == gunType:
        mySprite.set_image(assets.image("""
            nessieSquirt
        """))
    else:
        mySprite.set_image(assets.image("""
            myImage
        """))
    info.change_score_by(1)
    if info.score() >= 1000:
        myEnemySprite.follow(mySprite, speed + 20)
    if myEnemySprite.vx > 0:
        myEnemySprite.set_image(img("""
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        """))
game.on_update(on_on_update)

def on_update_interval():
    myEnemySprite.say_text("What's our HIGHEST priority right now?")
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    myEnemySprite.say_text("What's this project's STATUS?")
game.on_update_interval(12000, on_update_interval2)

def on_update_interval3():
    myEnemySprite.say_text("LETS DO GREAT WORK!!!")
game.on_update_interval(8000, on_update_interval3)
