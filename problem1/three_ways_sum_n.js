var sum_to_n_a = function (n) {
    // recursive method
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return sum_to_n_a(n - 1) + n;
    }
};

var sum_to_n_b = function (n) {
    // iterative method
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_c = function (n) {
    // using arithmetic formula
    let sum = ((1 + n)*n)/2;
    return sum;
};


