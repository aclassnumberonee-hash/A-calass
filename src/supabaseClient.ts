import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// A check to see if the user has fully configured their Supabase instance
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_public_key';

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');

/**
 * Generic sync helper that returns data from Supabase if configured,
 * otherwise falls back to local storage.
 */
export async function getPlatformData<T>(tableName: string, localStorageKey: string, defaultValue: T): Promise<T> {
  if (!isSupabaseConfigured) {
    // Fallback to localStorage
    const local = localStorage.getItem(localStorageKey);
    if (!local) {
      localStorage.setItem(localStorageKey, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(local);
    } catch (e) {
      return defaultValue;
    }
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.warn(`Supabase fetch error for ${tableName}:`, error.message);
      throw error;
    }

    if (data && data.length > 0) {
      // Return parsed data. If the table is structured, we may need to format some JSON fields.
      const formatted = data.map(item => {
        const newItem = { ...item };
        // Convert any stringified JSON arrays/objects back
        if (typeof newItem.gradeIds === 'string') {
          try { newItem.gradeIds = JSON.parse(newItem.gradeIds); } catch(e){}
        }
        if (typeof newItem.packageIds === 'string') {
          try { newItem.packageIds = JSON.parse(newItem.packageIds); } catch(e){}
        }
        if (typeof newItem.weekIds === 'string') {
          try { newItem.weekIds = JSON.parse(newItem.weekIds); } catch(e){}
        }
        if (typeof newItem.questions === 'string') {
          try { newItem.questions = JSON.parse(newItem.questions); } catch(e){}
        }
        if (typeof newItem.answers === 'string') {
          try { newItem.answers = JSON.parse(newItem.answers); } catch(e){}
        }
        return newItem;
      });
      
      // Keep localStorage synchronized for offline resilience
      localStorage.setItem(localStorageKey, JSON.stringify(formatted));
      return formatted as unknown as T;
    } else {
      // If table is empty on Supabase, seed it with defaultValue if provided
      if (defaultValue && Array.isArray(defaultValue) && defaultValue.length > 0) {
        await savePlatformData(tableName, localStorageKey, defaultValue);
      }
      return defaultValue;
    }
  } catch (err) {
    console.error(`Failed to fetch from Supabase table ${tableName}, falling back to localStorage:`, err);
    const local = localStorage.getItem(localStorageKey);
    return local ? JSON.parse(local) : defaultValue;
  }
}

/**
 * Generic sync helper to save data both to Supabase (if configured)
 * and localStorage as backup.
 */
export async function savePlatformData<T>(tableName: string, localStorageKey: string, data: T): Promise<void> {
  // Always update localStorage first for instantaneous client feedback
  localStorage.setItem(localStorageKey, JSON.stringify(data));

  if (!isSupabaseConfigured) return;

  try {
    const dbTableName = tableName.startsWith('aclass_') ? tableName.replace('aclass_', '') : tableName;

    if (!Array.isArray(data)) {
      // Single object (like passwords config dict or custom config)
      // Check if it's the auth_passwords dictionary
      if (dbTableName === 'auth_passwords') {
        // Convert dictionary { userId: password } to table rows: { user_id, password }
        const rows = Object.entries(data).map(([userId, password]) => ({
          user_id: userId,
          password: password
        }));

        const { error: deleteError } = await supabase
          .from('auth_passwords')
          .delete()
          .neq('user_id', 'placeholder_nonexistent');

        if (deleteError) console.warn('Supabase clear auth_passwords error:', deleteError.message);

        if (rows.length > 0) {
          const { error: insertError } = await supabase
            .from('auth_passwords')
            .insert(rows);
          if (insertError) throw insertError;
        }
        return;
      }

      const { error } = await supabase
        .from(dbTableName)
        .upsert(data as any, { onConflict: 'id' });
      if (error) throw error;
      return;
    }

    // Prepare items by serializing JSON arrays/objects for relational tables
    const prepared = data.map(item => {
      const dbRow: any = {};
      
      // Convert camelCase keys back to snake_case if necessary for database columns
      // But we mapped snake_case columns in supabase_schema.sql for standard PostgreSQL
      // So we map client-side properties to match database columns
      Object.entries(item).forEach(([key, value]) => {
        let dbKey = key;
        // Map common properties
        if (key === 'stageId') dbKey = 'stage_id';
        else if (key === 'gradeId') dbKey = 'grade_id';
        else if (key === 'subjectId') dbKey = 'subject_id';
        else if (key === 'teacherId') dbKey = 'teacher_id';
        else if (key === 'packageId') dbKey = 'package_id';
        else if (key === 'studentId') dbKey = 'student_id';
        else if (key === 'quizId') dbKey = 'quiz_id';
        else if (key === 'gradeIds') dbKey = 'grade_ids';
        else if (key === 'packageIds') dbKey = 'package_ids';
        else if (key === 'weekIds') dbKey = 'week_ids';
        else if (key === 'studentCode') dbKey = 'student_code';
        else if (key === 'firstName') dbKey = 'first_name';
        else if (key === 'lastName') dbKey = 'last_name';
        else if (key === 'parentPhone') dbKey = 'parent_phone';
        else if (key === 'birthDate') dbKey = 'birth_date';
        else if (key === 'isBanned') dbKey = 'is_banned';
        else if (key === 'commissionRate') dbKey = 'commission_rate';
        else if (key === 'originalPrice') dbKey = 'original_price';
        else if (key === 'createdAt') dbKey = 'created_at';
        else if (key === 'activatedAt') dbKey = 'activated_at';
        else if (key === 'expiresAt') dbKey = 'expires_at';
        else if (key === 'paymentMethod') dbKey = 'payment_method';
        else if (key === 'transferFrom') dbKey = 'transfer_from';
        else if (key === 'adminId') dbKey = 'admin_id';
        else if (key === 'totalQuestions') dbKey = 'total_questions';
        else if (key === 'targetType') dbKey = 'target_type';
        else if (key === 'targetGradeId') dbKey = 'target_grade_id';

        dbRow[dbKey] = value;
      });

      // Stringify sub arrays and objects so Postgres TEXT or JSONB columns accept them
      if (dbRow.grade_ids && Array.isArray(dbRow.grade_ids)) {
        dbRow.grade_ids = JSON.stringify(dbRow.grade_ids);
      }
      if (dbRow.package_ids && Array.isArray(dbRow.package_ids)) {
        dbRow.package_ids = JSON.stringify(dbRow.package_ids);
      }
      if (dbRow.week_ids && Array.isArray(dbRow.week_ids)) {
        dbRow.week_ids = JSON.stringify(dbRow.week_ids);
      }
      if (dbRow.questions && (Array.isArray(dbRow.questions) || typeof dbRow.questions === 'object')) {
        dbRow.questions = JSON.stringify(dbRow.questions);
      }
      if (dbRow.answers && (Array.isArray(dbRow.answers) || typeof dbRow.answers === 'object')) {
        dbRow.answers = JSON.stringify(dbRow.answers);
      }
      
      return dbRow;
    });

    // Bulk deletion in table before insertion to prevent constraint duplication
    const primaryKeyCol = dbTableName === 'students' ? 'id' : 'id';
    const { error: deleteError } = await supabase
      .from(dbTableName)
      .delete()
      .neq(primaryKeyCol, 'placeholder_force_delete_all_rows_nonexistent');

    if (deleteError) {
      console.warn(`Supabase clear table error for ${dbTableName}:`, deleteError.message);
    }

    if (prepared.length > 0) {
      const { error: insertError } = await supabase
        .from(dbTableName)
        .insert(prepared);

      if (insertError) {
        console.error(`Supabase bulk insert error for ${dbTableName}:`, insertError.message);
        throw insertError;
      }
    }
  } catch (err) {
    console.error(`Failed to sync to Supabase table ${tableName}:`, err);
  }
}

/**
 * Loads all platform data from Supabase and synchronizes it to local storage.
 */
export async function syncAllFromSupabase(): Promise<void> {
  if (!isSupabaseConfigured) return;
  
  const tables = [
    { name: 'stages', key: 'aclass_stages', def: [] },
    { name: 'grades', key: 'aclass_grades', def: [] },
    { name: 'subjects', key: 'aclass_subjects', def: [] },
    { name: 'teachers', key: 'aclass_teachers', def: [] },
    { name: 'packages', key: 'aclass_packages', def: [] },
    { name: 'weeks', key: 'aclass_weeks', def: [] },
    { name: 'content', key: 'aclass_content', def: [] },
    { name: 'promo_codes', key: 'aclass_promo_codes', def: [] },
    { name: 'app_notifications', key: 'aclass_notifications', def: [] },
    { name: 'students', key: 'aclass_students', def: [] },
    { name: 'subscriptions', key: 'aclass_subscriptions', def: [] },
    { name: 'wallet_history', key: 'aclass_wallet_history', def: [] },
    { name: 'quiz_results', key: 'aclass_quiz_results', def: [] }
  ];

  for (const table of tables) {
    try {
      const data = await getPlatformData(table.name, table.key, table.def);
      localStorage.setItem(table.key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Error syncing table ${table.name} from Supabase:`, e);
    }
  }

  // Handle auth_passwords special dictionary mapping
  try {
    const { data, error } = await supabase.from('auth_passwords').select('*');
    if (!error && data && data.length > 0) {
      const dict: Record<string, string> = {};
      data.forEach(row => {
        dict[row.user_id] = row.password;
      });
      localStorage.setItem('aclass_auth_passwords', JSON.stringify(dict));
    }
  } catch (e) {
    console.warn('Error syncing auth_passwords from Supabase:', e);
  }
}

/**
 * Enable a global monkey-patch for localStorage.setItem to capture real-time updates
 * and stream them directly into Supabase without refactoring standard components.
 */
export function setupLocalDatabaseMonkeyPatch() {
  if (typeof window === 'undefined') return;

  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key: string, value: string) {
    originalSetItem.call(localStorage, key, value);

    // If key belongs to our platform data and Supabase is configured, sync in background
    if (key.startsWith('aclass_') && key !== 'aclass_theme' && key !== 'aclass_current_user') {
      const dbTableName = key.replace('aclass_', '');
      try {
        const parsed = JSON.parse(value);
        savePlatformData(dbTableName, key, parsed);
      } catch (e) {
        // Not JSON
      }
    }
  };
}
