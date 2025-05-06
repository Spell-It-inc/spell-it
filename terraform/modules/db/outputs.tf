output "spell_it_db_endpoint" {
  value = aws_db_instance.spell_it_db_instance.endpoint
}

output "spell_it_db_address" {
  value = aws_db_instance.spell_it_db_instance.address
}

output "spell_it_db_port" {
  value = aws_db_instance.spell_it_db_instance.port
}

output "spell_it_db_name" {
  value     = var.db_name
  sensitive = true
}

output "spell_it_db_user" {
  value     = aws_db_instance.spell_it_db_instance.username
  sensitive = true
}

output "spell_it_db_password" {
  value     = aws_db_instance.spell_it_db_instance.password
  sensitive = true
}
