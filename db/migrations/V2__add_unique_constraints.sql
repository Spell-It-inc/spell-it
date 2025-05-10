ALTER TABLE categories ADD CONSTRAINT uk_categories_category UNIQUE(category);

ALTER TABLE words ADD CONSTRAINT uk_words_word UNIQUE(word);

ALTER TABLE games ADD CONSTRAINT uk_games_game UNIQUE(game);

ALTER TABLE profiles ADD CONSTRAINT uk_profile_username UNIQUE(username);

ALTER TABLE rewards ADD CONSTRAINT uk_rewards_reward UNIQUE(name);