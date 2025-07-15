const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide(); // либо мы скрываем главную кнопку
        } else {
            tg.MainButton.show(); //либо выводим в случае ее отсутствия
        }   
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}