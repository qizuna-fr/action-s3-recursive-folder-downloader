import * as core from '@actions/core'
import * as s3 from './s3'

async function run(): Promise<void> {
  try {
    const S3Config: s3.Config = {
      endpoint: core.getInput('endpoint'),
      region: core.getInput('region'),
      credentials: {
        accessKeyId: core.getInput('accessKeyId'),
        secretAccessKey: core.getInput('secretAccessKey')
      }
    }

    const options: s3.DownloadOptions = {
      Bucket: core.getInput('Bucket'),
      Prefix: core.getInput('Prefix')
    }
    const destination = core.getInput('destination')

    s3.download(S3Config, options, destination)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
