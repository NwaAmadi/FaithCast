import { invoke } from '@tauri-apps/api/tauri';

export async function getAllHymns() {
  return await invoke('get_all_hymns');
}

export async function getAllScriptures() {
  return await invoke('get_all_scriptures');
}
// Add more Tauri-invoked functions as needed for CRUD
