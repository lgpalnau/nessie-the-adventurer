def on_a_pressed():
    mySprite.vy = -300
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

mySprite: Sprite = None
myEnemySprite: Sprite = None
scene.set_background_color(9)
tiles.set_current_tilemap(tilemap("""
    level1
"""))
music.set_volume(29)
music.play_melody("A F A B C5 G A G ", 120)
mySprite = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
myEnemySprite = sprites.create(assets.image("""
    Nega Nessie
"""), SpriteKind.enemy)
myEnemySprite.say("LETS DO GREAT WORK!!!")
mySprite.set_stay_in_screen(True)
controller.move_sprite(mySprite, 100, 0)
mySprite.ay = 500
scene.camera_follow_sprite(mySprite)
tiles.place_on_tile(mySprite, tiles.get_tile_location(0, 155))
tiles.place_on_tile(myEnemySprite, tiles.get_tile_location(5, 157))