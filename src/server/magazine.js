class Magazine {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }
    consume(a) {
        this.amount = Math.max(this.amount - a, 0);
    }
    gain(a) {
        this.amount += a;
    }
}