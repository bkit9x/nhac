import json
import os
import urllib.parse
import eyed3
from ftfy import fix_encoding

musics = []

for file in os.listdir('./Musics'):
    audiofile = eyed3.load("./Musics/" + file)

    try:
        title = audiofile.tag.title
        artist = audiofile.tag.artist
    except AttributeError:
        title = None
        artist = None

    sp = file.split('-')
    if not title:
        title = sp[0].replace('.mp3', '')
    if not artist:
        if len(sp) > 1:
            artist = "".join(sp[1:]).replace('.mp3', '')
        else:
            artist = 'Unknown'

    music = dict(
        name=fix_encoding(title).strip(),
        artist=fix_encoding(artist).strip(),
        url="https://raw.githubusercontent.com/bkit9x/nhac/main/Musics/"+urllib.parse.quote(file))
    musics.append(music)

with open('musics.json', 'w') as f:
    json.dump(musics, f)
