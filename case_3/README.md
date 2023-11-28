## Technical Assessment - Maxim Grise


### Installation

You will need to `npm install` both the library and the sample app, then run the compose file, as no dockerfile are published. Adding the build 

`cd ./SampleApp && npm install && cd ../`
`cd ./library/LruCacheProvider && npm install && cd ../../`

### Basic solution

A typescript library leveraging redis (aws elasticache) as a remote cache and lru-cache as the local solution.

Assumed that the requirements are simple enough in the sense that the entries size is rather stable, so that a maximum count of items and a max size per item is enough to properly configure a given service's cache, rather than a full cache size maximum


#### Done

- Basic library
- Sample stack to showcase usage of the library locally

#### Missing

- Proper unit tests
- Deployment of library to an artifact registry (artifactory, npm, etc...)
- More refined terraform with proper variables.tf file
- Allow setting a max total local cache size, by finding an efficient way to calculate object size at local cache insertion
- Have configuration from a config file or environment variables, to be set into a k8s configmap or a centralized keyvault, with proper validation