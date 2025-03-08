```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_elastic_beanstalk_application" "app" {
  name        = "real-estate-app"
  description = "Real Estate Marketplace Application"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = "real-estate-env"
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.1.2 running Docker"
  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "HealthCheckPath"
    value     = "/"
  }
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = "your-bucket.s3.amazonaws.com"
    origin_id   = "S3-your-bucket"
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-your-bucket"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
```