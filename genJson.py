import json
import os
import urllib.parse

musics = []

# rename
# for file in os.listdir('./'):
#     split = file.split('-')
#     last = split[-1].replace('.mp3', '')
#     if last.isnumeric():
#         os.rename(file, file.replace('-'+last, ''))
#         print(file)

for file in os.listdir('./Musics'):
    split = file.split('-')
    if len(split) > 1:
        name = split[0]
        artist = ''.join(split[1:]).replace('.mp3', '')
    else:
        name = split[0]
        artist = ''
    music = dict(name=name.strip(), artist=artist.strip(
    ), url="https://raw.githubusercontent.com/bkit9x/nhac/main/Musics/"+urllib.parse.quote(file))
    musics.append(music)

with open('musics.json', 'w') as f:
    json.dump(musics, f)
