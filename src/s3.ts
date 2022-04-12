import * as fs from 'fs'
import * as path from 'path'
import {GetObjectCommand, ListObjectsV2Command, ListObjectsV2Request, S3Client} from '@aws-sdk/client-s3'
import {Readable} from 'stream'

export class Config {
  endpoint: string
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
  constructor() {
    this.endpoint = ''
    this.region = ''
    this.credentials = {
      accessKeyId: '',
      secretAccessKey: ''
    }
  }
}

export type DownloadOptions = ListObjectsV2Request

export async function download(config: Config, options: ListObjectsV2Request, destination: string): Promise<void> {
  const S3 = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    credentials: config.credentials
  })

  const list = await S3.send(new ListObjectsV2Command(options))

  if (list && list.Contents) {
    for (const element of list.Contents) {
      if (element && element.Key) {
        const fullname = path.join(destination, element.Key)
        if (element.Key.endsWith('/')) {
          fs.mkdirSync(fullname, {recursive: true})
        } else {
          const data = await S3.send(new GetObjectCommand({Bucket: options.Bucket, Key: element.Key}))
          const body = data.Body as Readable
          body.pipe(fs.createWriteStream(fullname))
        }
      }
    }
  }
}
