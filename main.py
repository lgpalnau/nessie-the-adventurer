myEnemySprite: Sprite = None
mySprite: Sprite = None
game.set_game_over_effect(False, game.lose_effect)

info.set_life(3)

def change_text_interval():
    myEnemySprite.sayText("What's our HIGHEST priority right now?")

def change_text_interval_2():
    myEnemySprite.sayText("LETS DO GREAT WORK!!!")

def change_text_interval_3():
    myEnemySprite.sayText("What's this project's STATUS?")

def on_a_pressed():
    mySprite.vy = -300

def my_overlap_function():
    tiles.place_on_random_tile(myEnemySprite, assets.tile("binaryMid"))
    info.change_life_by(-1)
    if info.life() <= 0:
        mySprite.destroy()
        game.over(False)
    

controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)


scene.set_background_color(9)
tiles.set_current_tilemap(tilemap("""level1"""))
music.set_volume(29)
music.play_melody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
myEnemySprite = sprites.create(assets.image("""
    Nega Nessie
"""), SpriteKind.enemy)

tiles.place_on_tile(myEnemySprite, tiles.get_tile_location(9, 157))
myEnemySprite.follow(mySprite, 30)
mySprite.set_stay_in_screen(True)
controller.move_sprite(mySprite, 100, 0)
mySprite.ay = 500
scene.camera_follow_sprite(mySprite)
tiles.place_on_tile(mySprite, tiles.get_tile_location(3, 155))


game.on_update_interval(5000, change_text_interval)
game.on_update_interval(8000, change_text_interval_2)
game.on_update_interval(12000, change_text_interval_3)

sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, my_overlap_function)