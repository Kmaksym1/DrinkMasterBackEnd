// Middleware для проверки наличия файла
const checkFile = (req, res, next) => {
  if (!req.file) {
    console.warn('Avatar is not uploaded')
    // Если файл не был загружен, вы можете выполнить действия по умолчанию или выбрать другое поведение.
    // Например, отправить ошибку клиенту или установить значение по умолчанию.
    // В данном примере мы устанавливаем пустой объект вместо файла, чтобы избежать ошибок при обновлении.
    req.file = {};
  }
  next();
};

module.exports = checkFile;