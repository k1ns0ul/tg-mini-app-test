import { useEffect } from "react";

const tg = window.Telegram.WebApp;

export function useTelegram() {
    
    const onClose = () => {
        tg.close();
    };

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    };

    const openInvoice = (invoiceLink, callback) => {
        tg.openInvoice(invoiceLink, callback);
    };

    const showAlert = (message) => {
        tg.showAlert(message);
    };

    const showConfirm = (message, callback) => {
        tg.showConfirm(message, callback);
    };

    useEffect(() => {
        tg.ready();
    }, []);

    return {
        onClose,
        onToggleButton,
        openInvoice,
        showAlert,
        showConfirm,
        tg,
        user: tg.initDataUnsafe?.user,
        queryId: tg.initDataUnsafe?.query_id,
    };
}