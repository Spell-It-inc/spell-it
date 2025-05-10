ALTER TABLE categories ADD CONSTRAINT uk_categories_category UNIQUE(category_id);

ALTER TABLE words ADD CONSTRAINT uk_words_word UNIQUE(word_id);

ALTER TABLE games ADD CONSTRAINT uk_games_game UNIQUE(game_id);

ALTER TABLE profiles ADD CONSTRAINT uk_profile_username UNIQUE(profile_id);

ALTER TABLE rewards ADD CONSTRAINT uk_rewards_reward UNIQUE(name);