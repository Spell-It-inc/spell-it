CREATE TABLE accounts(
  id SERIAL PRIMARY KEY,
  auth_sub VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE games(
  game_id SERIAL PRIMARY KEY,
  game VARCHAR NOT NULL,
  description VARCHAR
);

CREATE TABLE difficulty_levels(
  difficulty_id SERIAL PRIMARY KEY,
  game_id INT NOT NULL,
  difficulty_level VARCHAR NOT NULL,
  CONSTRAINT fk_game_id FOREIGN KEY (game_id) REFERENCES games(game_id),
  CONSTRAINT unique_game_difficulty UNIQUE (game_id, difficulty_level) -- prevent duplicate difficulty names per game
);

CREATE TABLE categories(
  category_id SERIAL PRIMARY KEY,
  category VARCHAR NOT NULL,
  -- description VARCHAR
);


CREATE TABLE profiles(
  profile_id SERIAL PRIMARY KEY,
  account_id INT NOT NULL,
  username VARCHAR NOT NULL,
  age INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_account_id FOREIGN KEY(account_id) REFERENCES accounts(id)
);

CREATE table words(
  word_id SERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  word VARCHAR NOT NULL,
  CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE game_categories(
  game_category_id SERIAL PRIMARY KEY,
  game_id INT,
  category_id INT,
  CONSTRAINT fk_game_id FOREIGN KEY(game_id) REFERENCES games(game_id),
  CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE session_logs(
  session_log_id SERIAL PRIMARY KEY,
  profile_id INT NOT NULL,
  game_id INT NOT NULL,
  category_id INT NOT NULL,
  difficulty_level_id INT NOT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  score INT,
  CONSTRAINT fk_profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id),
  CONSTRAINT fk_game_id FOREIGN KEY(game_id) REFERENCES games(game_id),
  CONSTRAINT fk_category_id FOREIGN KEY(category_id) REFERENCES categories(category_id),
  CONSTRAINT fk_difficulty_level_id FOREIGN KEY(difficulty_level_id) REFERENCES difficulty_levels(difficulty_id)
);


CREATE TABLE rewards(
  reward_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR NOT NULL
);

CREATE TABLE earned_rewards(
  earned_reward_id SERIAL PRIMARY KEY,
  profile_id INT,
  reward_id INT,
  CONSTRAINT fk_profile_id FOREIGN KEY(profile_id) REFERENCES profiles(profile_id),
  CONSTRAINT fk_reward_id FOREIGN KEY(reward_id) REFERENCES rewards(reward_id)
);