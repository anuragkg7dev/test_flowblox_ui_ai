import { toaster } from "../ui/toaster"
import { SIGN_IN } from "./constants/AppRouterConstant"

export const SUCCESS = "success"
export const ERROR = "error"
export const WARNING = "warning"
export const INFO = "info"

export function showToast({ type = 'info', title, description }) {
    toaster.create({
        title: <strong>{title}</strong>,
        description: <span>{description}</span>,
        type,
    });
}


export const toast = {
    success: (title, description) =>
        showToast({ type: 'success', title, description }),
    error: (title, description) =>
        showToast({ type: 'error', title, description }),
    info: (title, description) =>
        showToast({ type: 'info', title, description }),
    warning: (title, description) =>
        showToast({ type: 'warning', title, description }),
};
