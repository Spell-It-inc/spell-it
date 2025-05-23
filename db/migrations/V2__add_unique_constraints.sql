ALTER TABLE categories ADD CONSTRAINT uk_categories_category UNIQUE(category_id);
ALTER TABLE categories ADD CONSTRAINT uk_categories_name UNIQUE(name);

ALTER TABLE words ADD CONSTRAINT uk_words_word UNIQUE(word_id);
ALTER TABLE words ADD CONSTRAINT uk_words_category_word UNIQUE(category_id, word);


ALTER TABLE games ADD CONSTRAINT uk_games_game UNIQUE(game_id);

ALTER TABLE profiles ADD CONSTRAINT uk_profile_username UNIQUE(profile_id);