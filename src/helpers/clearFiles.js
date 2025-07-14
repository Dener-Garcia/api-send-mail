const fs = require ('fs/promises')

async function deleteUploadedFiles(files) {
    if (!Array.isArray(files)) return;
  
    for (const file of files) {
      try {
        await fs.unlink(file.path);
        console.log(`🗑️ Arquivo removido: ${file.path}`);
      } catch (err) {
        console.error(`⚠️ Erro ao remover ${file.path}:`, err.message);
      }
    }
  }
  
  module.exports = {deleteUploadedFiles}