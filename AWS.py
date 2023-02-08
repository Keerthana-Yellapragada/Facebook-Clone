import boto3
import botocore
import os

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("SAKIAQDKEOCF3ZAFUYUO6"),
   aws_secret_access_key=os.environ.get("TJNo8Tc67buf4GSojR1++IBQjFyUhE0DS0nZj/Ir")
)
