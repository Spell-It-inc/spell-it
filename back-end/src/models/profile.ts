import { pool } from "../config/database";
import type { Profile } from "../interfaces/profile";

export class ProfileModel {
  static async findAll(): Promise<Profile[]> {
    const query = "SELECT * FROM profiles ORDER BY created_at DESC";
    const result = await pool.query(query);
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
    // Check if account and age group exist before creating the profile
    const accountResult = await pool.query(
      "SELECT account_id FROM accounts WHERE account_id = $1",
      [profileData.account_id]
    );
    if (accountResult.rows.length === 0) {
      throw new Error("Invalid account_id: Account does not exist");
    }

    const ageGroupResult = await pool.query(
      "SELECT age_group_id FROM age_groups WHERE age_group_id = $1",
      [profileData.age_group_id]
    );
    if (ageGroupResult.rows.length === 0) {
      throw new Error("Invalid age_group_id: Age group does not exist");
    }

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
    // Validate age_group_id if it's being updated
    if (profileData.age_group_id !== undefined) {
      const ageGroupResult = await pool.query(
        "SELECT age_group_id FROM age_groups WHERE age_group_id = $1",
        [profileData.age_group_id]
      );
      if (ageGroupResult.rows.length === 0) {
        throw new Error("Invalid age_group_id: Age group does not exist");
      }
    }

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
}
