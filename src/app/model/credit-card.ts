export class CreditCard {
    constructor(
        private creditCardNumber: string,
        private creditHolder: string,
        private expirationDate: Date,
        private amount: number,
        private securityCode?: string
    ) { }

}
