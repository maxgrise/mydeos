provider "aws" {
  region = var.tfstate_region
}

resource "aws_vpc" "mydeos_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "MyDeOs"
  }
}

resource "aws_subnet" "subnet_uswest_1" {
  vpc_id                  = aws_vpc.mydeos_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1"
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet_uswest_1"
  }
}

resource "aws_subnet" "subnet_useast_1" {
  vpc_id                  = aws_vpc.mydeos_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-west-1"
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet_useast_1"
  }
}

resource "aws_subnet" "subnet_canadacentral_1" {
  vpc_id                  = aws_vpc.mydeos_vpc.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "ca-central-1"
  map_public_ip_on_launch = true

  tags = {
    Name = "subnet_canadacentral_1"
  }
}

resource "aws_elasticache_subnet_group" "lrucache_subnet_group" {
  name       = "lrucache_subnet_group"
  subnet_ids = [aws_subnet.subnet_canadacentral_1.id, aws_subnet.subnet_uswest_1.id, aws_subnet.subnet_useast_1.id]
}

resource "random_password" "redis_lru_cache_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_elasticache_replication_group" "redis_lru_cache" {
  replication_group_id          = "lru_cache_global"
  replication_group_description = "Lru Cache Provider Replication Group"
  node_type                     = "cache.t2.micro"
  number_cache_clusters         = var.redis_node_count
  auth_token                    = random_password.redis_lru_cache_password.result

  cluster_mode {
    replicas_per_node_group = 1
    num_node_groups         = 3 # Number of regions
  }

  automatic_failover_enabled = true

  subnet_group_name = aws_elasticache_subnet_group.lrucache_subnet_group.name
}

resource "aws_secretsmanager_secret" "lru_cache_redis_credentials" {
  name = "lru_cache_redis_credentials"
}

resource "aws_secretsmanager_secret_version" "lru_cache_redis_credentials" {
  secret_id     = aws_secretsmanager_secret.lru_cache_redis_credentials.id
  secret_string = jsonencode({
    password = aws_elasticache_replication_group.redis_lru_cache.auth_token
  })
}

output "lru_cache_redis_credentials" {
  value = var.lru_cache_redis_credentials
}
