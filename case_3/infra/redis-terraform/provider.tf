terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.27.0"
    }
  }

  backend "s3" {
    bucket = "mydeos-assessment"
    key    = "lru-redis-terraform"
    region = "us-east-1"
  }
}
