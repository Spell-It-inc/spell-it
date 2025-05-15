import { pool } from "../config/database";
import type { Profile, ProfileRewards, ProfileSessionLogs } from "../interfaces/profile";

export class ProfileModel {
  static async findAll(filter?: { where?: { account_id?: number } }): Promise<Profile[]> {
    let query = "SELECT * FROM profiles";
    const values: any[] = [];

    if (filter?.where?.account_id !== undefined) {
      query += " WHERE account_id = $1";
      values.push(filter.where.account_id);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id: number): Promise<Profile | null> {
    const query = "SELECT * FROM profiles WHERE profile_id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async create(profileData: {
    account_id: number;
    username: string;
    age_group_id: number;
  }): Promise<Profile> {
    const query = `
            INSERT INTO profiles (account_id, username, age_group_id, created_at)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING *
        `;
    const values = [
      profileData.account_id,
      profileData.username,
      profileData.age_group_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(
    id: number,
    profileData: Partial<Pick<Profile, "username" | "age_group_id">>
  ): Promise<Profile | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let parameterIndex = 1;

    if (profileData.username !== undefined) {
      updates.push(`username = $${parameterIndex}`);
      values.push(profileData.username);
      parameterIndex++;
    }

    if (profileData.age_group_id !== undefined) {
      updates.push(`age_group_id = $${parameterIndex}`);
      values.push(profileData.age_group_id);
      parameterIndex++;
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const query = `
            UPDATE profiles 
            SET ${updates.join(", ")}
            WHERE profile_id = $${parameterIndex}
            RETURNING *
        `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async findEarnedRewardsByProfileId(
    id: number
  ): Promise<ProfileRewards | null> {
    const profileQuery =
      "SELECT profile_id, username FROM profiles WHERE profile_id = $1";

    const profileResult = await pool.query(profileQuery, [id]);

    if (profileResult.rows.length === 0) {
      return null;
    } else {
      const rewardsQuery = `
      SELECT r.reward_id, r.name, r.description, er.earned_at
      FROM earned_rewards er
      INNER JOIN rewards r ON er.earned_reward_id = r.reward_id
      INNER JOIN profiles p
      ON er.profile_id = p.profile_id
      WHERE p.profile_id = $1
      ORDER BY er.earned_at DESC;
      `;

      const rewardsResult = await pool.query(rewardsQuery, [id]);

      return {
        ...profileResult.rows[0],
        rewards: rewardsResult.rows,
      };
    }
  }

  static async findSessionLogByProfileId(id: number): Promise<ProfileSessionLogs[] | null> {
    const query = "SELECT * FROM view_session_logs WHERE profile_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows || null;
  }

}
