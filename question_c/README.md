## Technical Assessment - Maxim Grise

### Solution

Went with a straightforward solution of a typescript library leveraging redis (aws elasticache) as a remote cache, and lru-cache as the local cache.

Geo-redundency is done by leveraging the cloud provider availability zones and subnet rather than going for anything custom.

Cache LRU expiry is done with redis native maxmemory policy with LRU based eviction.

Assumed that the requirements are simple enough in the sense that the entries size is rather stable, so that a maximum count of items and a max size per item is enough to properly configure a given service's cache, rather than a full cache size maximum.

### Installation

`docker-compose build && docker-compose up` to run the whole thing, which is a redis stack, several replicas of producers and consumers.

#### Done

- Basic library
- Sample dockercompose stack to showcase usage of the library locally
- Boilerplate for a terraform project to deploy the required infra, with a cluster-based multi-zone redis and a lru maxmemory policy

#### Missing

- Have possibility to push remote cache updates locally, or tweak to have a local expiry smaller than the remote one, to avoid stale local cache. 
- Deploy on the cloud
- Use log framework 
- Proper unit tests
- Deployment of library to an artifact registry (artifactory, npm, etc...)
- More refined terraform with proper variables.tf file
- Allow setting a max total local cache size, by finding an efficient way to calculate object size at local cache insertion
- Have configuration from a config file or environment variables, to be set into a k8s configmap or a centralized keyvault, with proper validation
- Could have setup some Cucumber tests to implement the sample, instead of coupling with the dockercompose
- Allow disabling local cache and using only remote
- Load testing and performance tests
- Etc...