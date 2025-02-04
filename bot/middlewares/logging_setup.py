import os
import logging
from logging.handlers import TimedRotatingFileHandler


def setup_logging():
    """
    Логирование с ротацией логов каждый день и хранением 7 дней.
    Логи записываются в файл и выводятся в консоль.
    """
    log_file = "logs/errors.log"
    os.makedirs("logs", exist_ok=True)

    file_handler = TimedRotatingFileHandler(log_file, when="midnight", interval=1, backupCount=7)
    file_handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s]: %(message)s"))

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))

    logging.basicConfig(
        level=logging.INFO,
        handlers=[file_handler, console_handler]
    )
    logging.info("Logging setup complete. Logs will rotate daily.")
