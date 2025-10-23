use tauri::command;
use std::sync::Mutex;
use once_cell::sync::Lazy;
use rusqlite::{Connection, Result};

static DB: Lazy<Mutex<Option<Connection>>> = Lazy::new(|| Mutex::new(None));

fn get_connection() -> Result<Connection> {
    let mut db = DB.lock().unwrap();
    if db.is_none() {
        let conn = Connection::open("faithcast.sqlite")?;
        *db = Some(conn);
    }
    Ok(db.as_ref().unwrap().try_clone()?)
}

#[command]
pub fn get_all_hymns() -> Result<Vec<rusqlite::Row>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM hymns ORDER BY number").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| Ok(row)).map_err(|e| e.to_string())?;
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}

#[command]
pub fn get_all_scriptures() -> Result<Vec<rusqlite::Row>, String> {
    let conn = get_connection().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT * FROM scriptures ORDER BY book, chapter, verse_start").map_err(|e| e.to_string())?;
    let rows = stmt.query_map([], |row| Ok(row)).map_err(|e| e.to_string())?;
    let mut result = Vec::new();
    for row in rows {
        result.push(row.map_err(|e| e.to_string())?);
    }
    Ok(result)
}
