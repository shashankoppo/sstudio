import { db } from './db.js';

export function runJpgMigration() {
  console.log('Running JPG migration for existing database entries...');
  try {
    // Check if settings table exists
    const checkTable = db.prepare('SELECT name FROM sqlite_master WHERE type=? AND name=?');
    const hasSettings = checkTable.get('table', 'settings');
    
    if (hasSettings) {
      const updateSetting = db.prepare('UPDATE settings SET value = replace(value, \'.png\', \'.jpg\') WHERE value LIKE \'%.png\'');
      updateSetting.run();
      console.log('Updated settings to use .jpg');
    }

    const hasPortfolio = checkTable.get('table', 'portfolio_items');
    if (hasPortfolio) {
      const updateItem = db.prepare('UPDATE portfolio_items SET image_url = replace(image_url, \'.png\', \'.jpg\') WHERE image_url LIKE \'%.png\'');
      updateItem.run();
      console.log('Updated portfolio items to use .jpg');
    }

    console.log('JPG migration complete.');
  } catch (error) {
    console.error('JPG migration failed:', error);
  }
}
