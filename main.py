def on_a_pressed():
    global gunType
    if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
        mySprite.vy = -300
        gunType = "squirt"
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global isFacingLeft
    isFacingLeft = 1
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap(sprite, otherSprite):
    global gunType
    gunPickup.destroy()
    gunType = "squirt"
sprites.on_overlap(SpriteKind.food, SpriteKind.player, on_on_overlap)

def on_right_pressed():
    global isFacingLeft
    isFacingLeft = 0
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap2(sprite2, otherSprite2):
    tiles.place_on_random_tile(myEnemySprite, assets.tile("""
        binaryMid
    """))
    info.change_life_by(-1)
    if info.life() <= 0:
        mySprite.destroy()
        game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

isFacingLeft = 0
gunPickup: Sprite = None
myEnemySprite: Sprite = None
mySprite: Sprite = None
gunType = ""
game.set_game_over_effect(False, game.lose_effect)
info.set_life(3)
scene.set_background_color(13)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
music.set_volume(29)
music.play_melody("A F A B C5 G A G ", 120)
gunType = "none"
mySprite = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
myEnemySprite = sprites.create(assets.image("""
    Nega Nessie
"""), SpriteKind.enemy)
gunPickup = sprites.create(assets.image("""
    Squirt Gun
"""), SpriteKind.food)
tiles.place_on_tile(myEnemySprite, tiles.get_tile_location(9, 157))
myEnemySprite.follow(mySprite, 30)
mySprite.set_stay_in_screen(True)
controller.move_sprite(mySprite, 100, 0)
mySprite.ay = 500
scene.camera_follow_sprite(mySprite)
tiles.place_on_tile(mySprite, tiles.get_tile_location(3, 155))

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
