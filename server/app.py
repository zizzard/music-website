import os

from flask import Flask, Response
import boto3
from botocore.config import Config

import json
from collections import defaultdict

BUCKET=os.getenv("BUCKET")

get_config = Config(
    s3={"addressing_style": "virtual"},
)

def list_files(bucket):
    """
    Function to list files in a given S3 bucket
    """
    s3 = boto3.client("s3", config=get_config)
    contents = []
    try:
        for item in s3.list_objects(Bucket=bucket)["Contents"]:
            item["url"] = s3.generate_presigned_url(
                "get_object", Params = {"Bucket": bucket, "Key": item["Key"]},
            )
            contents.append(item)
    except Exception as e:
        print(e)

    return contents


app = Flask(__name__)

@app.route("/data")
def data():
    contents = list_files(BUCKET)
    organized_contents = defaultdict(lambda: defaultdict(dict))

    for song in contents:
        key = song["Key"]
        data = key.split("/")

        artist_name = data[1]
        album_name  = data[2]
        song_name   = data[3]

        organized_contents[artist_name][album_name][song_name] = {
            "url": song["url"]
        }
    
    to_return = []
    for artist in organized_contents:
        artist_name = artist

        albums = []
        for album in organized_contents[artist]:
            album_name = album

            songs = []
            for song in organized_contents[artist][album]:
                song_name = song
                url = organized_contents[artist][album][song]["url"]

                songs.append({
                    "song": song_name,
                    "song_url": url
                })
            
            albums.append({
                "album": album_name,
                "songs": songs
            })
        
        to_return.append({
            "artist": artist,
            "albums": albums
        })

    return Response(json.dumps(to_return), mimetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)
