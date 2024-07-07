class Datasource {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getPrices(): Promise<{ [key: string]: number }> {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error('Failed to fetch prices');
        }
        const data = await response.json();
        const prices: { [key: string]: number } = {};
        data.forEach((item: { currency: string, price: number }) => {
            prices[item.currency] = item.price;
        });
        return prices;
    }
}

export { Datasource };
