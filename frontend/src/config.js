export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
export const VIA_CEP_BASE_URL = process.env.REACT_APP_VIA_CEP_BASE_URL

export const CONTRACT_RULES = {
    MAX_INSTALLMENTS: 12,
    PAYMENT_METHODS: {
        CREDIT_CARD: "Cartão de Crédito",
        BOLETO: "Boleto",
        PIX: "Pix",
        UNDEFINED: "Cliente Escolhe",
    }
}

export const PAYMENT_STATUS_DETAILS = {
    OPEN: {
        TRANSLATION: "Em Aberto",
        COLOR: "bg-slate-100"
    },
    PAID: {
        TRANSLATION: "Pago",
        COLOR: "bg-green-400/70"
    },
    CONFIRMED: {
        TRANSLATION: "Confirmado",
        COLOR: "bg-green-400/70"
    },
    OVERDUE: {
        TRANSLATION: "Vencido",
        COLOR: "bg-red-400/80"
    },
}