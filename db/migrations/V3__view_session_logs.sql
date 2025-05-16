CREATE OR REPLACE VIEW view_session_logs AS
SELECT
  sl.session_log_id,
  sl.profile_id,
  g.name AS game_name,
  c.name AS category_name,
  sl.score,
  sl.started_at,
  sl.ended_at
FROM
  session_logs sl
JOIN profiles p ON sl.profile_id = p.profile_id
JOIN games g ON sl.game_id = g.game_id
JOIN categories c ON sl.category_id = c.category_id;