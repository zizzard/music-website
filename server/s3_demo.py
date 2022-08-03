import boto3
from botocore.config import Config

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
