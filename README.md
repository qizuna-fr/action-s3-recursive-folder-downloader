# Title

Use this action to download folder, recursively (= including subfolders), from a S3 Object storage.

## How to use

```yaml
# ...
jobs:
  # ...
  steps:
    # ...
    - uses: qizuna-fr/action-s3-recursive-folder-downloader@v1
      with:
        endpoint: 'https://endpoint.url'
        region: 'region'
        accessKeyId: ${{ secrets.S3_ACCESS_KEY }}
        secretAccessKey: ${{ secrets.S3_SECRET_ACCESS_KEY }}
        Bucket: 'my-bucket-name'
        Prefix: '/' # Optional
        destination: 'output' # Optional
```

## Inputs

| Name              | Type   | Required | Comment                                                                                                     |
| :---------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------- |
| `endpoint`        | string | yes      | Endpoint url, MUST start with `https://` (e.g. `https://s3.fr-par.scw.cloud` for the Scaleway® S3 in Paris) |
| `region`          | string | yes      | Region of the S3 storage (e.g. `fr-par` for the Paris Scaleway® region)                                     |
| `accessKeyId`     | string | yes      | Your Access Key                                                                                             |
| `secretAccessKey` | string | yes      | Your Secret Access Key (aka: password)                                                                      |
| `Bucket`          | string | yes      | The name of the bucket                                                                                      |
| `Prefix`          | string | no       | Remote source folder path (e.g. `"/path/to/download"`)<br>_Default: `"/"`_                                  |
| `destination`     | string | no       | Local destination folder<br>_Default: `"."`_                                                                |

_Copyright (c) 2022 Qizuna_
