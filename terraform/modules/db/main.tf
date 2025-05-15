resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "aws_subnet_group_db"
  subnet_ids = ["subnet-029b0db058922036d", "subnet-0d0cbaa921dc1cb34"]
  # subnet_ids = [var.subnet_id, var.second_subnet_id]
}

resource "aws_db_instance" "spell_it_db_instance" {
  identifier             = "spell-it-db-instance"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "17.2"
  skip_final_snapshot    = true
  publicly_accessible    = true
  vpc_security_group_ids = ["sg-0357158e468110cc9"]
  # vpc_security_group_ids = [var.vpc_security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
  username               = var.db_username
  password               = var.db_password
}